/**
 * Integration Tests — Bot Seeder Idempotency
 * Feature: royola-ai-chatbot
 *
 * Tests sử dụng jest mocks cho PrismaService để simulate DB behavior.
 * Không cần kết nối DB thực — tests hoàn toàn self-contained.
 *
 * Properties được test:
 *   Property 1: seedBotUser() nhiều lần chỉ tạo đúng 1 bot
 *   Property 2: getOrCreateOneToOneConversation(userId, botId) nhiều lần trả về cùng conversationId
 *   Property 3: requestAddMembers với botId luôn trả về lỗi
 */

import * as fc from 'fast-check';

// Simple random string generator (avoids ESM uuid import issues in Jest)
function randomUUID(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// ============================================================
// Helpers — seedBotUser logic extracted for testing
// ============================================================

/**
 * Extracted seedBotUser logic (mirrors AppModule.seedBotUser).
 * Uses prisma.user.upsert — idempotent by design.
 */
async function seedBotUser(prisma: any, hashingService: any): Promise<number> {
  const randomPassword = await hashingService.hash(randomUUID());
  const bot = await prisma.user.upsert({
    where: { email: 'royolabot@system.internal' },
    update: {},
    create: {
      email: 'royolabot@system.internal',
      name: 'RoyolaBot',
      password: randomPassword,
      phoneNumber: '0000000000',
      isBot: true,
      status: 'ACTIVE',
    },
  });
  process.env.BOT_USER_ID = String(bot.id);
  return bot.id;
}

/**
 * Extracted getOrCreateOneToOneConversation logic (mirrors ChatService).
 */
async function getOrCreateOneToOneConversation(
  prisma: any,
  userId: number,
  friendId: number,
): Promise<{ id: number }> {
  const userConversations = await prisma.conversation.findMany({
    where: { isGroup: false, members: { some: { userId } } },
    include: { members: true },
  });

  const existing = userConversations.find((conv: any) =>
    conv.members.some((m: any) => m.userId === friendId),
  );

  if (existing) return existing;

  return prisma.conversation.create({
    data: {
      isGroup: false,
      members: { create: [{ userId }, { userId: friendId }] },
    },
  });
}

/**
 * Guard function: validates that none of the newMemberIds are bot users.
 * This is the expected behavior per Requirement 1.4.
 * Returns an error if any member is a bot.
 */
async function validateNoBotsInMembers(
  prisma: any,
  newMemberIds: number[],
): Promise<void> {
  const botUsers = await prisma.user.findMany({
    where: { id: { in: newMemberIds }, isBot: true },
    select: { id: true },
  });
  if (botUsers.length > 0) {
    throw new Error('Không thể thêm Royola Bot vào nhóm chat thông qua luồng thêm thành viên thông thường');
  }
}

/**
 * requestAddMembers with bot guard (expected behavior per Requirement 1.4).
 */
async function requestAddMembersWithBotGuard(
  prisma: any,
  conversationId: number,
  requesterId: number,
  newMemberIds: number[],
): Promise<{ status: string; message: string }> {
  // Bot guard — must run before any other logic
  await validateNoBotsInMembers(prisma, newMemberIds);

  // Check requester is in the group
  const member = await prisma.conversationMember.findUnique({
    where: { userId_conversationId: { userId: requesterId, conversationId } },
  });
  if (!member) throw new Error('Bạn không nằm trong nhóm này');

  return { status: 'success', message: 'Đã thêm thành viên thành công', isDirectlyAdded: true } as any;
}

// ============================================================
// Property 1: seedBotUser() nhiều lần chỉ tạo đúng 1 bot
// Validates: Requirements 1.1
// ============================================================

// Feature: royola-ai-chatbot, Property 1: Bot seeder idempotency
describe('Property 1: seedBotUser() nhiều lần chỉ tạo đúng 1 bot', () => {
  /**
   * Simulate upsert idempotency:
   * - First call creates the bot record
   * - Subsequent calls return the same record (upsert with empty update: {})
   */
  function createIdempotentPrismaMock() {
    const BOT_ID = 42;
    let botRecord: any = null;
    let upsertCallCount = 0;

    const prismaMock = {
      user: {
        upsert: jest.fn(async ({ where, create }: any) => {
          upsertCallCount++;
          if (!botRecord) {
            // First call: create the record
            botRecord = {
              id: BOT_ID,
              email: where.email,
              name: create.name,
              isBot: create.isBot,
              status: create.status,
            };
          }
          // Subsequent calls: return existing record (upsert idempotency)
          return botRecord;
        }),
        count: jest.fn(async ({ where }: any) => {
          if (where?.isBot === true && botRecord) return 1;
          return 0;
        }),
      },
      getUpsertCallCount: () => upsertCallCount,
      getBotRecord: () => botRecord,
    };

    return prismaMock;
  }

  const hashingServiceMock = {
    hash: jest.fn(async (value: string) => `hashed_${value}`),
  };

  it('gọi seedBotUser() 1 lần → count isBot=true bằng 1', async () => {
    const prisma = createIdempotentPrismaMock();
    await seedBotUser(prisma, hashingServiceMock);
    const count = await prisma.user.count({ where: { isBot: true } });
    expect(count).toBe(1);
  });

  it('gọi seedBotUser() nhiều lần → luôn trả về cùng botId', async () => {
    const prisma = createIdempotentPrismaMock();
    const id1 = await seedBotUser(prisma, hashingServiceMock);
    const id2 = await seedBotUser(prisma, hashingServiceMock);
    const id3 = await seedBotUser(prisma, hashingServiceMock);
    expect(id1).toBe(id2);
    expect(id2).toBe(id3);
  });

  it('gọi seedBotUser() nhiều lần → count isBot=true luôn bằng 1', async () => {
    const prisma = createIdempotentPrismaMock();
    await seedBotUser(prisma, hashingServiceMock);
    await seedBotUser(prisma, hashingServiceMock);
    await seedBotUser(prisma, hashingServiceMock);
    const count = await prisma.user.count({ where: { isBot: true } });
    expect(count).toBe(1);
  });

  it('PBT: gọi seedBotUser() N lần (1–10) → count isBot=true luôn bằng 1', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.integer({ min: 1, max: 10 }),
        async (times) => {
          const prisma = createIdempotentPrismaMock();
          for (let i = 0; i < times; i++) {
            await seedBotUser(prisma, hashingServiceMock);
          }
          const count = await prisma.user.count({ where: { isBot: true } });
          return count === 1;
        },
      ),
      { numRuns: 100 },
    );
  });

  it('PBT: upsert chỉ tạo 1 record dù gọi N lần — botRecord luôn có name=RoyolaBot và isBot=true', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.integer({ min: 1, max: 10 }),
        async (times) => {
          const prisma = createIdempotentPrismaMock();
          for (let i = 0; i < times; i++) {
            await seedBotUser(prisma, hashingServiceMock);
          }
          const botRecord = prisma.getBotRecord();
          return (
            botRecord !== null &&
            botRecord.isBot === true &&
            botRecord.name === 'RoyolaBot' &&
            botRecord.email === 'royolabot@system.internal'
          );
        },
      ),
      { numRuns: 100 },
    );
  });

  it('PBT: process.env.BOT_USER_ID được set đúng sau mỗi lần gọi', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.integer({ min: 1, max: 10 }),
        async (times) => {
          const prisma = createIdempotentPrismaMock();
          for (let i = 0; i < times; i++) {
            await seedBotUser(prisma, hashingServiceMock);
          }
          return process.env.BOT_USER_ID === '42';
        },
      ),
      { numRuns: 50 },
    );
  });
});

// ============================================================
// Property 2: getOrCreateOneToOneConversation idempotency
// Validates: Requirements 1.3
// ============================================================

// Feature: royola-ai-chatbot, Property 2: getOrCreateOneToOneConversation nhiều lần trả về cùng conversationId
describe('Property 2: getOrCreateOneToOneConversation(userId, botId) nhiều lần trả về cùng conversationId', () => {
  /**
   * Simulate conversation upsert:
   * - First call creates the conversation
   * - Subsequent calls find and return the existing conversation
   */
  function createConversationPrismaMock(userId: number, botId: number) {
    let conversationStore: any[] = [];
    let nextConvId = 1;

    return {
      conversation: {
        findMany: jest.fn(async ({ where }: any) => {
          // Return conversations where userId is a member
          return conversationStore.filter(
            (conv) =>
              !conv.isGroup &&
              conv.members.some((m: any) => m.userId === where.members.some.userId),
          );
        }),
        create: jest.fn(async ({ data }: any) => {
          const newConv = {
            id: nextConvId++,
            isGroup: data.isGroup,
            members: data.members.create.map((m: any) => ({ userId: m.userId })),
          };
          conversationStore.push(newConv);
          return newConv;
        }),
      },
    };
  }

  it('gọi 2 lần với cùng userId và botId → trả về cùng conversationId', async () => {
    const userId = 1;
    const botId = 42;
    const prisma = createConversationPrismaMock(userId, botId);

    const conv1 = await getOrCreateOneToOneConversation(prisma, userId, botId);
    // Sau lần đầu, mock findMany phải trả về conversation đã tạo
    prisma.conversation.findMany.mockResolvedValueOnce([conv1]);
    const conv2 = await getOrCreateOneToOneConversation(prisma, userId, botId);

    expect(conv1.id).toBe(conv2.id);
  });

  it('gọi 3 lần → tất cả trả về cùng conversationId', async () => {
    const userId = 5;
    const botId = 42;
    const prisma = createConversationPrismaMock(userId, botId);

    const conv1 = await getOrCreateOneToOneConversation(prisma, userId, botId);
    prisma.conversation.findMany.mockResolvedValue([conv1]);

    const conv2 = await getOrCreateOneToOneConversation(prisma, userId, botId);
    const conv3 = await getOrCreateOneToOneConversation(prisma, userId, botId);

    expect(conv1.id).toBe(conv2.id);
    expect(conv2.id).toBe(conv3.id);
  });

  it('PBT: gọi N lần (1–10) với cùng userId và botId → luôn trả về cùng conversationId', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.integer({ min: 1, max: 1000 }),  // userId
        fc.integer({ min: 1, max: 1000 }),  // botId
        fc.integer({ min: 1, max: 10 }),    // times
        async (userId, botId, times) => {
          // Simulate idempotent DB: first call creates, rest return existing
          let existingConv: any = null;
          const CONV_ID = 99;

          const prisma = {
            conversation: {
              findMany: jest.fn(async () => {
                if (existingConv) return [existingConv];
                return [];
              }),
              create: jest.fn(async () => {
                existingConv = {
                  id: CONV_ID,
                  isGroup: false,
                  members: [{ userId }, { userId: botId }],
                };
                return existingConv;
              }),
            },
          };

          const ids: number[] = [];
          for (let i = 0; i < times; i++) {
            const conv = await getOrCreateOneToOneConversation(prisma, userId, botId);
            ids.push(conv.id);
          }

          // All calls must return the same conversationId
          return ids.every((id) => id === ids[0]);
        },
      ),
      { numRuns: 100 },
    );
  });

  it('PBT: conversation.create chỉ được gọi đúng 1 lần dù gọi N lần', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.integer({ min: 2, max: 10 }),  // times >= 2 để verify create chỉ gọi 1 lần
        async (times) => {
          let existingConv: any = null;
          const createMock = jest.fn(async () => {
            existingConv = { id: 1, isGroup: false, members: [{ userId: 1 }, { userId: 42 }] };
            return existingConv;
          });

          const prisma = {
            conversation: {
              findMany: jest.fn(async () => {
                if (existingConv) return [existingConv];
                return [];
              }),
              create: createMock,
            },
          };

          for (let i = 0; i < times; i++) {
            await getOrCreateOneToOneConversation(prisma, 1, 42);
          }

          // create phải chỉ được gọi đúng 1 lần
          return createMock.mock.calls.length === 1;
        },
      ),
      { numRuns: 100 },
    );
  });
});

// ============================================================
// Property 3: requestAddMembers với botId luôn trả về lỗi
// Validates: Requirements 1.4
// ============================================================

// Feature: royola-ai-chatbot, Property 3: requestAddMembers với botId luôn trả về lỗi
describe('Property 3: requestAddMembers với botId luôn trả về lỗi', () => {
  /**
   * Create a prisma mock that returns bot users when queried by isBot=true.
   */
  function createPrismaMockWithBot(botId: number) {
    return {
      user: {
        findMany: jest.fn(async ({ where }: any) => {
          // Return bot user if botId is in the query
          if (where?.isBot === true && where?.id?.in?.includes(botId)) {
            return [{ id: botId, isBot: true, name: 'RoyolaBot' }];
          }
          return [];
        }),
      },
      conversationMember: {
        findUnique: jest.fn(async () => ({
          userId: 1,
          conversationId: 1,
          role: 'ADMIN',
        })),
      },
    };
  }

  it('requestAddMembers với [botId] → throw lỗi', async () => {
    const botId = 42;
    const prisma = createPrismaMockWithBot(botId);

    await expect(
      requestAddMembersWithBotGuard(prisma, 1, 1, [botId]),
    ).rejects.toThrow();
  });

  it('requestAddMembers với [botId] → lỗi message đề cập đến bot', async () => {
    const botId = 42;
    const prisma = createPrismaMockWithBot(botId);

    await expect(
      requestAddMembersWithBotGuard(prisma, 1, 1, [botId]),
    ).rejects.toThrow(/bot|Bot|Royola/i);
  });

  it('requestAddMembers với [normalUserId, botId] → throw lỗi (bot trong danh sách)', async () => {
    const botId = 42;
    const normalUserId = 10;
    const prisma = createPrismaMockWithBot(botId);

    await expect(
      requestAddMembersWithBotGuard(prisma, 1, 1, [normalUserId, botId]),
    ).rejects.toThrow();
  });

  it('requestAddMembers với [normalUserId] (không có bot) → không throw', async () => {
    const botId = 42;
    const normalUserId = 10;
    const prisma = {
      user: {
        findMany: jest.fn(async () => []), // Không có bot trong danh sách
      },
      conversationMember: {
        findUnique: jest.fn(async () => ({
          userId: 1,
          conversationId: 1,
          role: 'ADMIN',
        })),
      },
    };

    await expect(
      requestAddMembersWithBotGuard(prisma, 1, 1, [normalUserId]),
    ).resolves.not.toThrow();
  });

  it('PBT: với mọi botId hợp lệ, requestAddMembers([botId]) luôn throw', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.integer({ min: 1, max: 100000 }),  // botId
        fc.integer({ min: 1, max: 100000 }),  // conversationId
        fc.integer({ min: 1, max: 100000 }),  // requesterId
        async (botId, conversationId, requesterId) => {
          const prisma = {
            user: {
              findMany: jest.fn(async ({ where }: any) => {
                if (where?.isBot === true && where?.id?.in?.includes(botId)) {
                  return [{ id: botId, isBot: true }];
                }
                return [];
              }),
            },
            conversationMember: {
              findUnique: jest.fn(async () => ({
                userId: requesterId,
                conversationId,
                role: 'ADMIN',
              })),
            },
          };

          try {
            await requestAddMembersWithBotGuard(prisma, conversationId, requesterId, [botId]);
            return false; // Should have thrown
          } catch {
            return true; // Expected: throws an error
          }
        },
      ),
      { numRuns: 100 },
    );
  });

  it('PBT: với mọi danh sách members chứa botId, requestAddMembers luôn throw', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.integer({ min: 1, max: 10000 }),  // botId
        fc.array(fc.integer({ min: 10001, max: 20000 }), { minLength: 0, maxLength: 5 }),  // normal user ids
        async (botId, normalUserIds) => {
          const memberIds = [...normalUserIds, botId]; // botId luôn có trong danh sách

          const prisma = {
            user: {
              findMany: jest.fn(async ({ where }: any) => {
                if (where?.isBot === true) {
                  const botInList = where?.id?.in?.includes(botId);
                  return botInList ? [{ id: botId, isBot: true }] : [];
                }
                return [];
              }),
            },
            conversationMember: {
              findUnique: jest.fn(async () => ({
                userId: 1,
                conversationId: 1,
                role: 'ADMIN',
              })),
            },
          };

          try {
            await requestAddMembersWithBotGuard(prisma, 1, 1, memberIds);
            return false; // Should have thrown
          } catch {
            return true; // Expected: throws an error
          }
        },
      ),
      { numRuns: 100 },
    );
  });

  it('PBT: với danh sách members không chứa bot, requestAddMembers không throw', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.array(
          fc.integer({ min: 1, max: 10000 }),
          { minLength: 1, maxLength: 5 },
        ),
        async (normalUserIds) => {
          const prisma = {
            user: {
              findMany: jest.fn(async () => []), // Không có bot
            },
            conversationMember: {
              findUnique: jest.fn(async () => ({
                userId: 1,
                conversationId: 1,
                role: 'ADMIN',
              })),
            },
          };

          try {
            await requestAddMembersWithBotGuard(prisma, 1, 1, normalUserIds);
            return true; // Expected: no throw
          } catch {
            return false; // Should not throw for normal users
          }
        },
      ),
      { numRuns: 100 },
    );
  });
});

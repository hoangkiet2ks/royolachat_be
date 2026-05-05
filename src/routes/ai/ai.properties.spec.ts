/**
 * Property-Based Tests — Royola AI Chatbot
 * Feature: royola-ai-chatbot
 *
 * TDD Exploration: Các pure functions được import từ './ai.service' (chưa tồn tại).
 * Tests sẽ FAIL khi chạy lần đầu — đây là TDD approach.
 * Sau khi implement Task 3.2, tất cả tests phải PASS.
 */

import * as fc from 'fast-check';
import {
  isBotMention,
  extractMentionContent,
  filterMessagesForAI,
  parseSmartReplies,
  shouldShowSmartReply,
  shouldShowToneEditor,
  hasSensitiveContent,
} from './ai.service';
import { AiService } from './ai.service';

// ============================================================
// Property 7: Bot mention detection case-insensitive
// ============================================================

// Feature: royola-ai-chatbot, Property 7: Bot mention detection case-insensitive
describe('Property 7: isBotMention nhận diện @RoyolaBot case-insensitive', () => {
  it('tất cả variant viết hoa/thường của @RoyolaBot đều trả về true', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 0, maxLength: 200 }),
        (suffix) => {
          const variants = ['@RoyolaBot', '@royolabot', '@ROYOLABOT', '@RoYoLaBoT'];
          return variants.every((v) => isBotMention(`${v} ${suffix}`) === true);
        },
      ),
      { numRuns: 100 },
    );
  });

  it('string không bắt đầu bằng @RoyolaBot trả về false', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 200 }).filter(
          (s) => !s.toLowerCase().startsWith('@royolabot'),
        ),
        (text) => {
          return isBotMention(text) === false;
        },
      ),
      { numRuns: 100 },
    );
  });

  it('extractMentionContent trả về phần nội dung sau @RoyolaBot', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 200 }),
        (content) => {
          const text = `@RoyolaBot ${content}`;
          const extracted = extractMentionContent(text);
          return extracted === content;
        },
      ),
      { numRuns: 100 },
    );
  });
});

// ============================================================
// Property 8: Rate limit per group — 1 request/3 giây
// ============================================================

// Feature: royola-ai-chatbot, Property 8: Rate limit per group 1 request/3 giây
describe('Property 8: checkGroupRateLimit từ chối request thứ 2 trong < 3000ms', () => {
  it('2 requests cùng conversationId trong < 3s → request thứ 2 bị từ chối', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 10000 }),
        (conversationId) => {
          // Tạo instance mới để isolate state
          const service = new AiService(null as any);
          // Request đầu tiên phải được chấp nhận
          const first = service.checkGroupRateLimit(conversationId);
          service.recordGroupRequest(conversationId);
          // Request thứ hai ngay lập tức (< 3000ms) phải bị từ chối
          const second = service.checkGroupRateLimit(conversationId);
          return first === true && second === false;
        },
      ),
      { numRuns: 100 },
    );
  });
});

// ============================================================
// Property 9: filterMessagesForAI loại bỏ non-TEXT và recalled
// ============================================================

// Feature: royola-ai-chatbot, Property 9: filterMessagesForAI chỉ giữ TEXT và không recalled
describe('Property 9: filterMessagesForAI chỉ giữ TEXT và isRecalled=false', () => {
  it('kết quả chỉ chứa type=TEXT và isRecalled=false', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.record({
            type: fc.constantFrom('TEXT', 'IMAGE', 'FILE', 'SYSTEM', 'CALL_LOG'),
            isRecalled: fc.boolean(),
            content: fc.string(),
          }),
          { minLength: 0, maxLength: 50 },
        ),
        (messages) => {
          const result = filterMessagesForAI(messages as any);
          return result.every(
            (m: any) => m.type === 'TEXT' && m.isRecalled === false,
          );
        },
      ),
      { numRuns: 100 },
    );
  });

  it('không có phần tử nào có type khác TEXT hoặc isRecalled=true trong kết quả', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.record({
            type: fc.constantFrom('IMAGE', 'FILE', 'SYSTEM', 'CALL_LOG'),
            isRecalled: fc.boolean(),
            content: fc.string(),
          }),
          { minLength: 1, maxLength: 20 },
        ),
        (messages) => {
          const result = filterMessagesForAI(messages as any);
          return result.length === 0;
        },
      ),
      { numRuns: 100 },
    );
  });
});

// ============================================================
// Property 12: Smart Reply output constraints
// ============================================================

// Feature: royola-ai-chatbot, Property 12: Smart Reply output constraints
describe('Property 12: parseSmartReplies trả về <= 3 gợi ý, mỗi gợi ý <= 50 ký tự', () => {
  it('với mọi string đầu vào, kết quả luôn thỏa mãn constraints', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 0, maxLength: 500 }),
        (geminiResponse) => {
          const replies = parseSmartReplies(geminiResponse);
          return (
            Array.isArray(replies) &&
            replies.length <= 3 &&
            replies.every((r: string) => r.length <= 50)
          );
        },
      ),
      { numRuns: 100 },
    );
  });

  it('với JSON lạ hoặc text thuần, vẫn trả về mảng hợp lệ', () => {
    fc.assert(
      fc.property(
        fc.oneof(
          fc.constant(''),
          fc.constant('{}'),
          fc.constant('[]'),
          fc.constant('not json at all'),
          fc.constant('{"replies": ["a", "b", "c", "d", "e"]}'),
          fc.string({ minLength: 0, maxLength: 200 }),
        ),
        (input) => {
          const replies = parseSmartReplies(input);
          return (
            Array.isArray(replies) &&
            replies.length <= 3 &&
            replies.every((r: string) => typeof r === 'string' && r.length <= 50)
          );
        },
      ),
      { numRuns: 100 },
    );
  });
});

// ============================================================
// Property 13: Smart Reply chỉ hiển thị cho tin nhắn TEXT
// ============================================================

// Feature: royola-ai-chatbot, Property 13: shouldShowSmartReply false với non-TEXT
describe('Property 13: shouldShowSmartReply trả về false với mọi type !== TEXT', () => {
  it('IMAGE, FILE, SYSTEM, CALL_LOG luôn trả về false', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('IMAGE', 'FILE', 'SYSTEM', 'CALL_LOG'),
        (type) => {
          const message = { type, content: 'some content', isRecalled: false };
          return shouldShowSmartReply(message as any) === false;
        },
      ),
      { numRuns: 100 },
    );
  });

  it('TEXT trả về true', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 200 }),
        (content) => {
          const message = { type: 'TEXT', content, isRecalled: false };
          return shouldShowSmartReply(message as any) === true;
        },
      ),
      { numRuns: 100 },
    );
  });
});

// ============================================================
// Property 14: Tone Editor range [5, 2000] ký tự
// ============================================================

// Feature: royola-ai-chatbot, Property 14: Tone Editor chỉ hiển thị trong [5, 2000] ký tự
describe('Property 14: shouldShowToneEditor đúng với mọi độ dài string', () => {
  it('kết quả phải bằng length >= 5 && length <= 2000', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 0, maxLength: 3000 }),
        (text) => {
          const result = shouldShowToneEditor(text);
          const expected = text.length >= 5 && text.length <= 2000;
          return result === expected;
        },
      ),
      { numRuns: 100 },
    );
  });

  it('string rỗng trả về false', () => {
    expect(shouldShowToneEditor('')).toBe(false);
  });

  it('string 4 ký tự trả về false', () => {
    expect(shouldShowToneEditor('abcd')).toBe(false);
  });

  it('string 5 ký tự trả về true', () => {
    expect(shouldShowToneEditor('abcde')).toBe(true);
  });

  it('string 2000 ký tự trả về true', () => {
    expect(shouldShowToneEditor('a'.repeat(2000))).toBe(true);
  });

  it('string 2001 ký tự trả về false', () => {
    expect(shouldShowToneEditor('a'.repeat(2001))).toBe(false);
  });
});

// ============================================================
// Property 15: Rate limit per user — 50 requests/hour
// ============================================================

// Feature: royola-ai-chatbot, Property 15: Rate limit per user 50 requests/hour
describe('Property 15: checkRateLimit từ chối request thứ 51 trong cùng window', () => {
  it('sau 50 requests, request thứ 51 bị từ chối', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.integer({ min: 1, max: 100000 }),
        async (userId) => {
          const service = new AiService(null as any);
          // Ghi nhận 50 requests
          for (let i = 0; i < 50; i++) {
            await service.recordRequest(userId);
          }
          // Request thứ 51 phải bị từ chối
          const allowed = await service.checkRateLimit(userId);
          return allowed === false;
        },
      ),
      { numRuns: 50 },
    );
  });

  it('trước 50 requests, checkRateLimit trả về true', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.integer({ min: 1, max: 100000 }),
        fc.integer({ min: 0, max: 49 }),
        async (userId, count) => {
          const service = new AiService(null as any);
          for (let i = 0; i < count; i++) {
            await service.recordRequest(userId);
          }
          const allowed = await service.checkRateLimit(userId);
          return allowed === true;
        },
      ),
      { numRuns: 50 },
    );
  });
});

// ============================================================
// Property 16: Sensitive content detection
// ============================================================

// Feature: royola-ai-chatbot, Property 16: hasSensitiveContent detect credit card + password
describe('Property 16: hasSensitiveContent phát hiện credit card và password pattern', () => {
  it('text chứa 16 chữ số liên tiếp → true', () => {
    fc.assert(
      fc.property(
        fc.tuple(
          fc.string({ minLength: 0, maxLength: 50 }),
          fc.string({ minLength: 0, maxLength: 50 }),
        ),
        ([prefix, suffix]) => {
          const ccText = `${prefix} 4111111111111111 ${suffix}`;
          return hasSensitiveContent(ccText) === true;
        },
      ),
      { numRuns: 100 },
    );
  });

  it('text chứa password=... → true', () => {
    fc.assert(
      fc.property(
        fc.tuple(
          fc.string({ minLength: 0, maxLength: 50 }),
          fc.string({ minLength: 0, maxLength: 50 }),
        ),
        ([prefix, suffix]) => {
          const pwText = `${prefix} password=abc123 ${suffix}`;
          return hasSensitiveContent(pwText) === true;
        },
      ),
      { numRuns: 100 },
    );
  });

  it('text bình thường không chứa pattern nhạy cảm → false', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 100 }).filter((s) => {
          // Loại bỏ string có thể chứa 16 chữ số liên tiếp hoặc password pattern
          return (
            !/\d{16}/.test(s) &&
            !/password\s*[=:]/i.test(s) &&
            !/mật\s*khẩu\s*[=:]/i.test(s) &&
            !/passwd\s*[=:]/i.test(s)
          );
        }),
        (text) => {
          return hasSensitiveContent(text) === false;
        },
      ),
      { numRuns: 100 },
    );
  });
});

// ============================================================
// Property 17: Token-safe context — giới hạn 30,000 ký tự
// ============================================================

// Feature: royola-ai-chatbot, Property 17: buildContext tổng ký tự <= 30,000
describe('Property 17: buildContext trả về mảng có tổng ký tự <= 30,000', () => {
  it('với mọi N tin nhắn và độ dài, tổng ký tự kết quả không vượt 30,000', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.array(
          fc.record({
            role: fc.constantFrom('user', 'model'),
            content: fc.string({ minLength: 1, maxLength: 5000 }),
          }),
          { minLength: 0, maxLength: 20 },
        ),
        async (messages) => {
          const service = new AiService(null as any);
          // Inject messages trực tiếp vào buildContext thông qua helper
          const result = service.buildContextFromMessages(messages, 30000);
          const totalChars = result.reduce(
            (sum: number, m: any) => sum + m.parts[0].text.length,
            0,
          );
          return totalChars <= 30000;
        },
      ),
      { numRuns: 100 },
    );
  });

  it('nếu tổng ký tự <= 30000, trả về tất cả tin nhắn', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.array(
          fc.record({
            role: fc.constantFrom('user', 'model'),
            content: fc.string({ minLength: 1, maxLength: 100 }),
          }),
          { minLength: 0, maxLength: 10 },
        ),
        async (messages) => {
          const service = new AiService(null as any);
          const totalChars = messages.reduce((sum, m) => sum + m.content.length, 0);
          if (totalChars > 30000) return true; // skip nếu vượt ngưỡng
          const result = service.buildContextFromMessages(messages, 30000);
          return result.length === messages.length;
        },
      ),
      { numRuns: 100 },
    );
  });
});

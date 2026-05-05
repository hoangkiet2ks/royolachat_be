import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models';
export type * from './prismaNamespace';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
export declare const ModelName: {
    readonly User: "User";
    readonly VerificationCode: "VerificationCode";
    readonly Device: "Device";
    readonly RefreshToken: "RefreshToken";
    readonly Friendship: "Friendship";
    readonly Conversation: "Conversation";
    readonly ConversationMember: "ConversationMember";
    readonly Message: "Message";
    readonly GroupJoinRequest: "GroupJoinRequest";
    readonly MessageReaction: "MessageReaction";
    readonly BotModerator: "BotModerator";
    readonly AiRateLimit: "AiRateLimit";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly email: "email";
    readonly name: "name";
    readonly password: "password";
    readonly phoneNumber: "phoneNumber";
    readonly avatar: "avatar";
    readonly banner: "banner";
    readonly birthday: "birthday";
    readonly appRole: "appRole";
    readonly totpSecret: "totpSecret";
    readonly status: "status";
    readonly isBot: "isBot";
    readonly lastSeenAt: "lastSeenAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const VerificationCodeScalarFieldEnum: {
    readonly id: "id";
    readonly email: "email";
    readonly code: "code";
    readonly type: "type";
    readonly expiresAt: "expiresAt";
    readonly createdAt: "createdAt";
};
export type VerificationCodeScalarFieldEnum = (typeof VerificationCodeScalarFieldEnum)[keyof typeof VerificationCodeScalarFieldEnum];
export declare const DeviceScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly userAgent: "userAgent";
    readonly ip: "ip";
    readonly isActive: "isActive";
    readonly lastActive: "lastActive";
    readonly createdAt: "createdAt";
};
export type DeviceScalarFieldEnum = (typeof DeviceScalarFieldEnum)[keyof typeof DeviceScalarFieldEnum];
export declare const RefreshTokenScalarFieldEnum: {
    readonly token: "token";
    readonly userId: "userId";
    readonly deviceId: "deviceId";
    readonly expiresAt: "expiresAt";
    readonly createdAt: "createdAt";
};
export type RefreshTokenScalarFieldEnum = (typeof RefreshTokenScalarFieldEnum)[keyof typeof RefreshTokenScalarFieldEnum];
export declare const FriendshipScalarFieldEnum: {
    readonly id: "id";
    readonly requesterId: "requesterId";
    readonly receiverId: "receiverId";
    readonly status: "status";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type FriendshipScalarFieldEnum = (typeof FriendshipScalarFieldEnum)[keyof typeof FriendshipScalarFieldEnum];
export declare const ConversationScalarFieldEnum: {
    readonly id: "id";
    readonly isGroup: "isGroup";
    readonly name: "name";
    readonly avatar: "avatar";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ConversationScalarFieldEnum = (typeof ConversationScalarFieldEnum)[keyof typeof ConversationScalarFieldEnum];
export declare const ConversationMemberScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly conversationId: "conversationId";
    readonly role: "role";
    readonly joinedAt: "joinedAt";
    readonly lastReadMessageId: "lastReadMessageId";
    readonly clearedAt: "clearedAt";
};
export type ConversationMemberScalarFieldEnum = (typeof ConversationMemberScalarFieldEnum)[keyof typeof ConversationMemberScalarFieldEnum];
export declare const MessageScalarFieldEnum: {
    readonly id: "id";
    readonly content: "content";
    readonly fileUrl: "fileUrl";
    readonly type: "type";
    readonly isRecalled: "isRecalled";
    readonly replyToId: "replyToId";
    readonly senderId: "senderId";
    readonly conversationId: "conversationId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly deletedByIds: "deletedByIds";
    readonly isPinned: "isPinned";
};
export type MessageScalarFieldEnum = (typeof MessageScalarFieldEnum)[keyof typeof MessageScalarFieldEnum];
export declare const GroupJoinRequestScalarFieldEnum: {
    readonly id: "id";
    readonly conversationId: "conversationId";
    readonly userId: "userId";
    readonly inviterId: "inviterId";
    readonly status: "status";
    readonly createdAt: "createdAt";
};
export type GroupJoinRequestScalarFieldEnum = (typeof GroupJoinRequestScalarFieldEnum)[keyof typeof GroupJoinRequestScalarFieldEnum];
export declare const MessageReactionScalarFieldEnum: {
    readonly id: "id";
    readonly messageId: "messageId";
    readonly userId: "userId";
    readonly emoji: "emoji";
    readonly createdAt: "createdAt";
};
export type MessageReactionScalarFieldEnum = (typeof MessageReactionScalarFieldEnum)[keyof typeof MessageReactionScalarFieldEnum];
export declare const BotModeratorScalarFieldEnum: {
    readonly id: "id";
    readonly conversationId: "conversationId";
    readonly isEnabled: "isEnabled";
    readonly enabledBy: "enabledBy";
    readonly enabledAt: "enabledAt";
    readonly updatedAt: "updatedAt";
};
export type BotModeratorScalarFieldEnum = (typeof BotModeratorScalarFieldEnum)[keyof typeof BotModeratorScalarFieldEnum];
export declare const AiRateLimitScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly requestCount: "requestCount";
    readonly windowStart: "windowStart";
    readonly updatedAt: "updatedAt";
};
export type AiRateLimitScalarFieldEnum = (typeof AiRateLimitScalarFieldEnum)[keyof typeof AiRateLimitScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];

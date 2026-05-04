"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListFriendResSchema = exports.AddFriendResSchema = exports.SearchUserResSchema = exports.FriendshipSchema = exports.UserProfileSchema = exports.AcceptFriendSchema = exports.AddFriendSchema = exports.SearchUserSchema = void 0;
const zod_1 = require("zod");
exports.SearchUserSchema = zod_1.z.object({
    phoneNumber: zod_1.z.string().min(1, 'Số điện thoại không được trống'),
});
exports.AddFriendSchema = zod_1.z.object({
    receiverId: zod_1.z.number().positive('ID người nhận không hợp lệ'),
});
exports.AcceptFriendSchema = zod_1.z.object({
    requesterId: zod_1.z.number().positive('ID người gửi lời mời không hợp lệ'),
});
exports.UserProfileSchema = zod_1.z.object({
    id: zod_1.z.number(),
    name: zod_1.z.string(),
    phoneNumber: zod_1.z.string(),
    avatar: zod_1.z.string().nullable(),
    email: zod_1.z.string().email(),
});
exports.FriendshipSchema = zod_1.z.object({
    id: zod_1.z.number(),
    requesterId: zod_1.z.number(),
    receiverId: zod_1.z.number(),
    requester: exports.UserProfileSchema,
    receiver: exports.UserProfileSchema,
    status: zod_1.z.enum(['PENDING', 'ACCEPTED', 'BLOCKED']),
    createdAt: zod_1.z.date().or(zod_1.z.string()),
    updatedAt: zod_1.z.date().or(zod_1.z.string()),
});
exports.SearchUserResSchema = zod_1.z.object({
    success: zod_1.z.boolean(),
    data: exports.UserProfileSchema.optional(),
    error: zod_1.z.string().nullable(),
});
exports.AddFriendResSchema = zod_1.z.object({
    success: zod_1.z.boolean(),
    data: exports.FriendshipSchema.optional(),
    error: zod_1.z.string().nullable(),
});
exports.ListFriendResSchema = zod_1.z.object({
    success: zod_1.z.boolean(),
    data: zod_1.z.array(exports.UserProfileSchema),
    error: zod_1.z.string().nullable(),
});
//# sourceMappingURL=friend.model.js.map
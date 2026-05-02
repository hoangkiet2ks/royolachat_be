import { z } from 'zod'

// ==========================================
// 1. REQUEST SCHEMAS
// ==========================================

export const SearchUserSchema = z.object({
  phoneNumber: z.string().min(1, 'Số điện thoại không được trống'),
})
export type SearchUserBody = z.infer<typeof SearchUserSchema>

export const AddFriendSchema = z.object({
  receiverId: z.number().positive('ID người nhận không hợp lệ'),
})
export type AddFriendBody = z.infer<typeof AddFriendSchema>

export const AcceptFriendSchema = z.object({
  requesterId: z.number().positive('ID người gửi lời mời không hợp lệ'),
})
export type AcceptFriendBody = z.infer<typeof AcceptFriendSchema>

// ==========================================
// 2. RESPONSE SCHEMAS
// ==========================================

export const UserProfileSchema = z.object({
  id: z.number(),
  name: z.string(),
  phoneNumber: z.string(),
  avatar: z.string().nullable(),
  email: z.string().email(),
})
export type UserProfile = z.infer<typeof UserProfileSchema>

export const FriendshipSchema = z.object({
  id: z.number(),
  requesterId: z.number(),
  receiverId: z.number(),
  requester: UserProfileSchema,
  receiver: UserProfileSchema,
  status: z.enum(['PENDING', 'ACCEPTED', 'BLOCKED']),
  createdAt: z.date().or(z.string()),
  updatedAt: z.date().or(z.string()),
})
export type Friendship = z.infer<typeof FriendshipSchema>

export const SearchUserResSchema = z.object({
  success: z.boolean(),
  data: UserProfileSchema.optional(),
  error: z.string().nullable(),
})
export type SearchUserRes = z.infer<typeof SearchUserResSchema>

export const AddFriendResSchema = z.object({
  success: z.boolean(),
  data: FriendshipSchema.optional(),
  error: z.string().nullable(),
})
export type AddFriendRes = z.infer<typeof AddFriendResSchema>

export const ListFriendResSchema = z.object({
  success: z.boolean(),
  data: z.array(UserProfileSchema),
  error: z.string().nullable(),
})
export type ListFriendRes = z.infer<typeof ListFriendResSchema>

import { z } from 'zod';
export declare const SearchUserSchema: z.ZodObject<{
    phoneNumber: z.ZodString;
}, z.core.$strip>;
export type SearchUserBody = z.infer<typeof SearchUserSchema>;
export declare const AddFriendSchema: z.ZodObject<{
    receiverId: z.ZodNumber;
}, z.core.$strip>;
export type AddFriendBody = z.infer<typeof AddFriendSchema>;
export declare const AcceptFriendSchema: z.ZodObject<{
    requesterId: z.ZodNumber;
}, z.core.$strip>;
export type AcceptFriendBody = z.infer<typeof AcceptFriendSchema>;
export declare const UserProfileSchema: z.ZodObject<{
    id: z.ZodNumber;
    name: z.ZodString;
    phoneNumber: z.ZodString;
    avatar: z.ZodNullable<z.ZodString>;
    email: z.ZodString;
}, z.core.$strip>;
export type UserProfile = z.infer<typeof UserProfileSchema>;
export declare const FriendshipSchema: z.ZodObject<{
    id: z.ZodNumber;
    requesterId: z.ZodNumber;
    receiverId: z.ZodNumber;
    requester: z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
        phoneNumber: z.ZodString;
        avatar: z.ZodNullable<z.ZodString>;
        email: z.ZodString;
    }, z.core.$strip>;
    receiver: z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
        phoneNumber: z.ZodString;
        avatar: z.ZodNullable<z.ZodString>;
        email: z.ZodString;
    }, z.core.$strip>;
    status: z.ZodEnum<{
        PENDING: "PENDING";
        ACCEPTED: "ACCEPTED";
        BLOCKED: "BLOCKED";
    }>;
    createdAt: z.ZodUnion<[z.ZodDate, z.ZodString]>;
    updatedAt: z.ZodUnion<[z.ZodDate, z.ZodString]>;
}, z.core.$strip>;
export type Friendship = z.infer<typeof FriendshipSchema>;
export declare const SearchUserResSchema: z.ZodObject<{
    success: z.ZodBoolean;
    data: z.ZodOptional<z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
        phoneNumber: z.ZodString;
        avatar: z.ZodNullable<z.ZodString>;
        email: z.ZodString;
    }, z.core.$strip>>;
    error: z.ZodNullable<z.ZodString>;
}, z.core.$strip>;
export type SearchUserRes = z.infer<typeof SearchUserResSchema>;
export declare const AddFriendResSchema: z.ZodObject<{
    success: z.ZodBoolean;
    data: z.ZodOptional<z.ZodObject<{
        id: z.ZodNumber;
        requesterId: z.ZodNumber;
        receiverId: z.ZodNumber;
        requester: z.ZodObject<{
            id: z.ZodNumber;
            name: z.ZodString;
            phoneNumber: z.ZodString;
            avatar: z.ZodNullable<z.ZodString>;
            email: z.ZodString;
        }, z.core.$strip>;
        receiver: z.ZodObject<{
            id: z.ZodNumber;
            name: z.ZodString;
            phoneNumber: z.ZodString;
            avatar: z.ZodNullable<z.ZodString>;
            email: z.ZodString;
        }, z.core.$strip>;
        status: z.ZodEnum<{
            PENDING: "PENDING";
            ACCEPTED: "ACCEPTED";
            BLOCKED: "BLOCKED";
        }>;
        createdAt: z.ZodUnion<[z.ZodDate, z.ZodString]>;
        updatedAt: z.ZodUnion<[z.ZodDate, z.ZodString]>;
    }, z.core.$strip>>;
    error: z.ZodNullable<z.ZodString>;
}, z.core.$strip>;
export type AddFriendRes = z.infer<typeof AddFriendResSchema>;
export declare const ListFriendResSchema: z.ZodObject<{
    success: z.ZodBoolean;
    data: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
        phoneNumber: z.ZodString;
        avatar: z.ZodNullable<z.ZodString>;
        email: z.ZodString;
    }, z.core.$strip>>;
    error: z.ZodNullable<z.ZodString>;
}, z.core.$strip>;
export type ListFriendRes = z.infer<typeof ListFriendResSchema>;

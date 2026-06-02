import { FriendService } from './friend.service';
import { type SearchUserBody, type AddFriendBody, type AcceptFriendBody, type BlockUserBody } from './friend.model';
export declare class FriendController {
    private friendService;
    constructor(friendService: FriendService);
    searchUser(activeUser: any, body: SearchUserBody): Promise<{
        success: boolean;
        data: {
            id: number;
            email: string;
            name: string;
            phoneNumber: string;
            avatar: string | null;
        };
        error: null;
    }>;
    addFriend(activeUser: any, body: AddFriendBody): Promise<{
        success: boolean;
        data: {
            receiver: {
                id: number;
                email: string;
                name: string;
                phoneNumber: string;
                avatar: string | null;
            };
            requester: {
                id: number;
                email: string;
                name: string;
                phoneNumber: string;
                avatar: string | null;
            };
        } & {
            id: number;
            status: import("../../generated/prisma/enums").FriendshipStatus;
            createdAt: Date;
            updatedAt: Date;
            blockerIds: number[];
            receiverId: number;
            requesterId: number;
        };
        error: null;
    }>;
    acceptFriend(activeUser: any, body: AcceptFriendBody): Promise<{
        success: boolean;
        data: {
            receiver: {
                id: number;
                email: string;
                name: string;
                phoneNumber: string;
                avatar: string | null;
            };
            requester: {
                id: number;
                email: string;
                name: string;
                phoneNumber: string;
                avatar: string | null;
            };
        } & {
            id: number;
            status: import("../../generated/prisma/enums").FriendshipStatus;
            createdAt: Date;
            updatedAt: Date;
            blockerIds: number[];
            receiverId: number;
            requesterId: number;
        };
        error: null;
    }>;
    rejectFriend(activeUser: any, body: AcceptFriendBody): Promise<{
        success: boolean;
        data: null;
        error: null;
    }>;
    getFriendList(activeUser: any): Promise<{
        success: boolean;
        data: {
            id: number;
            email: string;
            name: string;
            phoneNumber: string;
            avatar: string | null;
        }[];
        error: null;
    }>;
    getPendingRequests(activeUser: any): Promise<{
        success: boolean;
        data: ({
            requester: {
                id: number;
                email: string;
                name: string;
                phoneNumber: string;
                avatar: string | null;
            };
        } & {
            id: number;
            status: import("../../generated/prisma/enums").FriendshipStatus;
            createdAt: Date;
            updatedAt: Date;
            blockerIds: number[];
            receiverId: number;
            requesterId: number;
        })[];
        error: null;
    }>;
    removeFriend(activeUser: any, body: {
        friendId: number;
    }): Promise<{
        success: boolean;
        data: {
            message: string;
        };
        error: null;
    }>;
    blockUser(activeUser: any, body: BlockUserBody): Promise<{
        success: boolean;
        data: {
            message: string;
        };
        error: null;
    }>;
    unblockUser(activeUser: any, body: BlockUserBody): Promise<{
        success: boolean;
        data: {
            message: string;
        };
        error: null;
    }>;
    getBlockList(activeUser: any): Promise<{
        success: boolean;
        data: {
            id: number;
            email: string;
            name: string;
            phoneNumber: string;
            avatar: string | null;
        }[];
        error: null;
    }>;
    checkBlockStatus(activeUser: any, body: {
        userId: number;
    }): Promise<{
        success: boolean;
        data: {
            blockerIds: number[];
        } | null;
        error: null;
    }>;
}

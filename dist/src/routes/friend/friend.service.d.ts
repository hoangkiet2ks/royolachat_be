import { FriendRepository } from './friend.repo';
import { SearchUserBody, AddFriendBody, AcceptFriendBody, BlockUserBody } from './friend.model';
import { ChatGateway } from '../chat/chat.gateway';
export declare class FriendService {
    private friendRepo;
    private chatGateway;
    constructor(friendRepo: FriendRepository, chatGateway: ChatGateway);
    searchUser(userId: number, body: SearchUserBody): Promise<{
        id: number;
        email: string;
        name: string;
        phoneNumber: string;
        avatar: string | null;
    }>;
    addFriend(userId: number, body: AddFriendBody): Promise<{
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
    }>;
    acceptFriend(userId: number, body: AcceptFriendBody): Promise<{
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
    }>;
    getFriendList(userId: number): Promise<{
        id: number;
        email: string;
        name: string;
        phoneNumber: string;
        avatar: string | null;
    }[]>;
    getPendingRequests(userId: number): Promise<({
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
    })[]>;
    rejectFriend(userId: number, body: AcceptFriendBody): Promise<{
        id: number;
        status: import("../../generated/prisma/enums").FriendshipStatus;
        createdAt: Date;
        updatedAt: Date;
        blockerIds: number[];
        receiverId: number;
        requesterId: number;
    }>;
    removeFriend(userId: number, friendId: number): Promise<{
        message: string;
    }>;
    blockUser(userId: number, body: BlockUserBody): Promise<{
        message: string;
    }>;
    unblockUser(userId: number, body: BlockUserBody): Promise<{
        message: string;
    }>;
    getBlockList(userId: number): Promise<{
        id: number;
        email: string;
        name: string;
        phoneNumber: string;
        avatar: string | null;
    }[]>;
    checkBlockStatus(userA: number, userB: number): Promise<{
        blockerIds: number[];
    } | null>;
}

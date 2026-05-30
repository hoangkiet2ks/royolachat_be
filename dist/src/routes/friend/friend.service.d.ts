import { FriendRepository } from './friend.repo';
import { SearchUserBody, AddFriendBody, AcceptFriendBody } from './friend.model';
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
        requesterId: number;
        receiverId: number;
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
        requesterId: number;
        receiverId: number;
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
        requesterId: number;
        receiverId: number;
    })[]>;
    rejectFriend(userId: number, body: AcceptFriendBody): Promise<{
        id: number;
        status: import("../../generated/prisma/enums").FriendshipStatus;
        createdAt: Date;
        updatedAt: Date;
        requesterId: number;
        receiverId: number;
    }>;
    removeFriend(userId: number, friendId: number): Promise<{
        message: string;
    }>;
}

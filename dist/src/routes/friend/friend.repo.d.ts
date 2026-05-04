import { PrismaService } from '../../shared/services/prisma.service';
export declare class FriendRepository {
    private prisma;
    constructor(prisma: PrismaService);
    findUserById(id: number): Promise<{
        id: number;
        email: string;
        name: string;
        phoneNumber: string;
        avatar: string | null;
    } | null>;
    findUserByPhoneNumber(phoneNumber: string): Promise<{
        id: number;
        email: string;
        name: string;
        phoneNumber: string;
        avatar: string | null;
    } | null>;
    checkFriendshipStatus(requesterId: number, receiverId: number): Promise<{
        id: number;
        status: import("../../generated/prisma/enums").FriendshipStatus;
    } | null>;
    createFriendRequest(requesterId: number, receiverId: number): Promise<{
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
    acceptFriendRequest(requesterId: number, receiverId: number): Promise<{
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
    rejectFriendRequest(requesterId: number, receiverId: number): Promise<{
        id: number;
        status: import("../../generated/prisma/enums").FriendshipStatus;
        createdAt: Date;
        updatedAt: Date;
        requesterId: number;
        receiverId: number;
    }>;
    deleteFriendship(userId: number, friendId: number): Promise<{
        id: number;
        status: import("../../generated/prisma/enums").FriendshipStatus;
        createdAt: Date;
        updatedAt: Date;
        requesterId: number;
        receiverId: number;
    }>;
}

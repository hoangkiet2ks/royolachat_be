import { Prisma, User } from '@/generated/prisma/client';
import { PrismaService } from '@/shared/services/prisma.service';
export type WhereUniqueUserType = Prisma.UserWhereUniqueInput;
export declare class AuthRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    createUser(data: Prisma.UserCreateInput): Prisma.Prisma__UserClient<{
        id: number;
        banner: string | null;
        status: import("@/generated/prisma/client").UserStatus;
        email: string;
        name: string;
        appRole: import("@/generated/prisma/client").AppRole;
        phoneNumber: string;
        avatar: string | null;
        lastSeenAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        birthday: Date | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    findUniqueUser(where: Prisma.UserWhereUniqueInput): Prisma.Prisma__UserClient<{
        id: number;
        banner: string | null;
        status: import("@/generated/prisma/client").UserStatus;
        email: string;
        name: string;
        appRole: import("@/generated/prisma/client").AppRole;
        password: string;
        phoneNumber: string;
        avatar: string | null;
        totpSecret: string | null;
        lastSeenAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        birthday: Date | null;
        isBot: boolean;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    findUniqueSafeUser(where: Prisma.UserWhereUniqueInput): Prisma.Prisma__UserClient<{
        id: number;
        banner: string | null;
        status: import("@/generated/prisma/client").UserStatus;
        email: string;
        name: string;
        appRole: import("@/generated/prisma/client").AppRole;
        phoneNumber: string;
        avatar: string | null;
        lastSeenAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        birthday: Date | null;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    createVerificationCode(payload: Prisma.VerificationCodeUncheckedCreateInput): Prisma.Prisma__VerificationCodeClient<{
        id: number;
        email: string;
        type: import("@/generated/prisma/client").VerificationCodeType;
        createdAt: Date;
        code: string;
        expiresAt: Date;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    findUniqueVerificationCode(where: Prisma.VerificationCodeWhereUniqueInput): Prisma.Prisma__VerificationCodeClient<{
        id: number;
        email: string;
        type: import("@/generated/prisma/client").VerificationCodeType;
        createdAt: Date;
        code: string;
        expiresAt: Date;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    deleteVerificationCode(where: Prisma.VerificationCodeWhereUniqueInput): Prisma.Prisma__VerificationCodeClient<{
        id: number;
        email: string;
        type: import("@/generated/prisma/client").VerificationCodeType;
        createdAt: Date;
        code: string;
        expiresAt: Date;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    createRefreshToken(data: Prisma.RefreshTokenUncheckedCreateInput): Prisma.Prisma__RefreshTokenClient<{
        token: string;
        userId: number;
        deviceId: number;
        createdAt: Date;
        expiresAt: Date;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    findUniqueRefreshTokenIncludeUser(where: Prisma.RefreshTokenWhereUniqueInput): Prisma.Prisma__RefreshTokenClient<({
        user: {
            id: number;
            banner: string | null;
            status: import("@/generated/prisma/client").UserStatus;
            email: string;
            name: string;
            appRole: import("@/generated/prisma/client").AppRole;
            password: string;
            phoneNumber: string;
            avatar: string | null;
            totpSecret: string | null;
            lastSeenAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
            birthday: Date | null;
            isBot: boolean;
        };
        device: {
            id: number;
            userId: number;
            createdAt: Date;
            userAgent: string;
            ip: string;
            isActive: boolean;
            lastActive: Date;
        };
    } & {
        token: string;
        userId: number;
        deviceId: number;
        createdAt: Date;
        expiresAt: Date;
    }) | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    deleteRefreshToken(where: Prisma.RefreshTokenWhereUniqueInput): Prisma.Prisma__RefreshTokenClient<{
        token: string;
        userId: number;
        deviceId: number;
        createdAt: Date;
        expiresAt: Date;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    deleteRefreshTokensByUserId(userId: number): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createDevice(data: Prisma.DeviceUncheckedCreateInput): Prisma.Prisma__DeviceClient<{
        id: number;
        userId: number;
        createdAt: Date;
        userAgent: string;
        ip: string;
        isActive: boolean;
        lastActive: Date;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    updateDevice(deviceId: number, data: Prisma.DeviceUncheckedUpdateInput): Prisma.Prisma__DeviceClient<{
        id: number;
        userId: number;
        createdAt: Date;
        userAgent: string;
        ip: string;
        isActive: boolean;
        lastActive: Date;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    deactivateDevicesByUserId(userId: number): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateUser(where: Prisma.UserWhereUniqueInput, data: Prisma.UserUpdateInput): Prisma.Prisma__UserClient<{
        id: number;
        banner: string | null;
        status: import("@/generated/prisma/client").UserStatus;
        email: string;
        name: string;
        appRole: import("@/generated/prisma/client").AppRole;
        phoneNumber: string;
        avatar: string | null;
        lastSeenAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        birthday: Date | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    findUnique(where: WhereUniqueUserType): Promise<User | null>;
    update(where: WhereUniqueUserType, data: Prisma.UserUpdateInput): Promise<User>;
}

import { Prisma, User } from '@/generated/prisma/client';
import { PrismaService } from '@/shared/services/prisma.service';
export type WhereUniqueUserType = Prisma.UserWhereUniqueInput;
export declare class AuthRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    createUser(data: Prisma.UserCreateInput): Prisma.Prisma__UserClient<{
        id: number;
        email: string;
        name: string;
        phoneNumber: string;
        avatar: string | null;
        banner: string | null;
        birthday: Date | null;
        appRole: import("@/generated/prisma/client").AppRole;
        status: import("@/generated/prisma/client").UserStatus;
        lastSeenAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    findUniqueUser(where: Prisma.UserWhereUniqueInput): Prisma.Prisma__UserClient<{
        id: number;
        email: string;
        name: string;
        password: string;
        phoneNumber: string;
        avatar: string | null;
        banner: string | null;
        birthday: Date | null;
        appRole: import("@/generated/prisma/client").AppRole;
        totpSecret: string | null;
        status: import("@/generated/prisma/client").UserStatus;
        lastSeenAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    findUniqueSafeUser(where: Prisma.UserWhereUniqueInput): Prisma.Prisma__UserClient<{
        id: number;
        email: string;
        name: string;
        phoneNumber: string;
        avatar: string | null;
        banner: string | null;
        birthday: Date | null;
        appRole: import("@/generated/prisma/client").AppRole;
        status: import("@/generated/prisma/client").UserStatus;
        lastSeenAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    createVerificationCode(payload: Prisma.VerificationCodeUncheckedCreateInput): Prisma.Prisma__VerificationCodeClient<{
        id: number;
        email: string;
        createdAt: Date;
        code: string;
        type: import("@/generated/prisma/client").VerificationCodeType;
        expiresAt: Date;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    findUniqueVerificationCode(where: Prisma.VerificationCodeWhereUniqueInput): Prisma.Prisma__VerificationCodeClient<{
        id: number;
        email: string;
        createdAt: Date;
        code: string;
        type: import("@/generated/prisma/client").VerificationCodeType;
        expiresAt: Date;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    deleteVerificationCode(where: Prisma.VerificationCodeWhereUniqueInput): Prisma.Prisma__VerificationCodeClient<{
        id: number;
        email: string;
        createdAt: Date;
        code: string;
        type: import("@/generated/prisma/client").VerificationCodeType;
        expiresAt: Date;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    createRefreshToken(data: Prisma.RefreshTokenUncheckedCreateInput): Prisma.Prisma__RefreshTokenClient<{
        createdAt: Date;
        expiresAt: Date;
        userId: number;
        token: string;
        deviceId: number;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    findUniqueRefreshTokenIncludeUser(where: Prisma.RefreshTokenWhereUniqueInput): Prisma.Prisma__RefreshTokenClient<({
        user: {
            id: number;
            email: string;
            name: string;
            password: string;
            phoneNumber: string;
            avatar: string | null;
            banner: string | null;
            birthday: Date | null;
            appRole: import("@/generated/prisma/client").AppRole;
            totpSecret: string | null;
            status: import("@/generated/prisma/client").UserStatus;
            lastSeenAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
        };
        device: {
            id: number;
            createdAt: Date;
            userId: number;
            userAgent: string;
            ip: string;
            isActive: boolean;
            lastActive: Date;
        };
    } & {
        createdAt: Date;
        expiresAt: Date;
        userId: number;
        token: string;
        deviceId: number;
    }) | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    deleteRefreshToken(where: Prisma.RefreshTokenWhereUniqueInput): Prisma.Prisma__RefreshTokenClient<{
        createdAt: Date;
        expiresAt: Date;
        userId: number;
        token: string;
        deviceId: number;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    deleteRefreshTokensByUserId(userId: number): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createDevice(data: Prisma.DeviceUncheckedCreateInput): Prisma.Prisma__DeviceClient<{
        id: number;
        createdAt: Date;
        userId: number;
        userAgent: string;
        ip: string;
        isActive: boolean;
        lastActive: Date;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    updateDevice(deviceId: number, data: Prisma.DeviceUncheckedUpdateInput): Prisma.Prisma__DeviceClient<{
        id: number;
        createdAt: Date;
        userId: number;
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
        email: string;
        name: string;
        phoneNumber: string;
        avatar: string | null;
        banner: string | null;
        birthday: Date | null;
        appRole: import("@/generated/prisma/client").AppRole;
        status: import("@/generated/prisma/client").UserStatus;
        lastSeenAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    findUnique(where: WhereUniqueUserType): Promise<User | null>;
    update(where: WhereUniqueUserType, data: Prisma.UserUpdateInput): Promise<User>;
}

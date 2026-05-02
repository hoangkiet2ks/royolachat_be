import { Prisma, User } from '@/generated/prisma/client'
import { PrismaService } from '@/shared/services/prisma.service'
import { Injectable } from '@nestjs/common'

const safeUserSelect = {
  id: true,
  email: true,
  name: true,
  phoneNumber: true,
  avatar: true,
  banner: true,
  birthday: true,
  appRole: true,
  status: true,
  lastSeenAt: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.UserSelect

export type WhereUniqueUserType = Prisma.UserWhereUniqueInput

@Injectable()
export class AuthRepository {
  constructor(private readonly prismaService: PrismaService) {}

  createUser(data: Prisma.UserCreateInput) {
    return this.prismaService.user.create({
      data,
      select: safeUserSelect,
    })
  }

  findUniqueUser(where: Prisma.UserWhereUniqueInput) {
    return this.prismaService.user.findUnique({
      where,
    })
  }

  findUniqueSafeUser(where: Prisma.UserWhereUniqueInput) {
    return this.prismaService.user.findUnique({
      where,
      select: safeUserSelect,
    })
  }

  createVerificationCode(payload: Prisma.VerificationCodeUncheckedCreateInput) {
    return this.prismaService.verificationCode.upsert({
      where: {
        email_type: {
          email: payload.email,
          type: payload.type,
        },
      },
      create: payload,
      update: {
        code: payload.code,
        expiresAt: payload.expiresAt,
      },
    })
  }

  findUniqueVerificationCode(where: Prisma.VerificationCodeWhereUniqueInput) {
    return this.prismaService.verificationCode.findUnique({
      where,
    })
  }

  deleteVerificationCode(where: Prisma.VerificationCodeWhereUniqueInput) {
    return this.prismaService.verificationCode.delete({
      where,
    })
  }

  createRefreshToken(data: Prisma.RefreshTokenUncheckedCreateInput) {
    return this.prismaService.refreshToken.create({
      data,
    })
  }

  findUniqueRefreshTokenIncludeUser(where: Prisma.RefreshTokenWhereUniqueInput) {
    return this.prismaService.refreshToken.findUnique({
      where,
      include: {
        user: true,
        device: true,
      },
    })
  }

  deleteRefreshToken(where: Prisma.RefreshTokenWhereUniqueInput) {
    return this.prismaService.refreshToken.delete({
      where,
    })
  }

  deleteRefreshTokensByUserId(userId: number) {
    return this.prismaService.refreshToken.deleteMany({
      where: { userId },
    })
  }

  createDevice(data: Prisma.DeviceUncheckedCreateInput) {
    return this.prismaService.device.create({
      data,
    })
  }

  updateDevice(deviceId: number, data: Prisma.DeviceUncheckedUpdateInput) {
    return this.prismaService.device.update({
      where: { id: deviceId },
      data,
    })
  }

  deactivateDevicesByUserId(userId: number) {
    return this.prismaService.device.updateMany({
      where: { userId, isActive: true },
      data: { isActive: false },
    })
  }

  updateUser(where: Prisma.UserWhereUniqueInput, data: Prisma.UserUpdateInput) {
    return this.prismaService.user.update({
      where,
      data,
      select: safeUserSelect, // Luôn trả về dữ liệu an toàn (không có password)
    })
  }

  findUnique(where: WhereUniqueUserType): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where,
    })
  }

  update(where: WhereUniqueUserType, data: Prisma.UserUpdateInput): Promise<User> {
    return this.prismaService.user.update({
      where,
      data,
    })
  }
}
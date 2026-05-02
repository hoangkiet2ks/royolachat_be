import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../shared/services/prisma.service'

@Injectable()
export class FriendRepository {
  constructor(private prisma: PrismaService) {}

  // Tìm user theo ID
  async findUserById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        phoneNumber: true,
        avatar: true,
        email: true,
      },
    })
  }

  // Tìm user theo số điện thoại
  async findUserByPhoneNumber(phoneNumber: string) {
    return this.prisma.user.findFirst({
      where: { phoneNumber },
      select: {
        id: true,
        name: true,
        phoneNumber: true,
        avatar: true,
        email: true,
      },
    })
  }

  // Kiểm tra xem đã gửi lời mời chưa (hoặc đã kết bạn)
  async checkFriendshipStatus(requesterId: number, receiverId: number) {
    return this.prisma.friendship.findFirst({
      where: {
        OR: [
          { requesterId, receiverId },
          { requesterId: receiverId, receiverId: requesterId },
        ],
      },
      select: { id: true, status: true },
    })
  }

  // Tạo lời mời kết bạn
  async createFriendRequest(requesterId: number, receiverId: number) {
    return this.prisma.friendship.create({
      data: {
        requesterId,
        receiverId,
        status: 'PENDING',
      },
      include: {
        requester: {
          select: { id: true, name: true, phoneNumber: true, avatar: true, email: true },
        },
        receiver: {
          select: { id: true, name: true, phoneNumber: true, avatar: true, email: true },
        },
      },
    })
  }

  // Chấp nhận lời mời kết bạn
  async acceptFriendRequest(requesterId: number, receiverId: number) {
    return this.prisma.friendship.update({
      where: {
        requesterId_receiverId: { requesterId, receiverId },
      },
      data: { status: 'ACCEPTED' },
      include: {
        requester: {
          select: { id: true, name: true, phoneNumber: true, avatar: true, email: true },
        },
        receiver: {
          select: { id: true, name: true, phoneNumber: true, avatar: true, email: true },
        },
      },
    })
  }

  // Lấy danh sách bạn bè (đã kết bạn)
  async getFriendList(userId: number) {
    const friendships = await this.prisma.friendship.findMany({
      where: {
        AND: [
          { status: 'ACCEPTED' },
          {
            OR: [{ requesterId: userId }, { receiverId: userId }],
          },
        ],
      },
      include: {
        requester: {
          select: { id: true, name: true, phoneNumber: true, avatar: true, email: true },
        },
        receiver: {
          select: { id: true, name: true, phoneNumber: true, avatar: true, email: true },
        },
      },
    })

    // Chuyển đổi để lấy user khác (không phải chính người dùng)
    return friendships.map((f) => (f.requesterId === userId ? f.receiver : f.requester))
  }

  // Lấy danh sách lời mời kết bạn chưa trả lời
  async getPendingRequests(userId: number) {
    return this.prisma.friendship.findMany({
      where: {
        receiverId: userId,
        status: 'PENDING',
      },
      include: {
        requester: {
          select: { id: true, name: true, phoneNumber: true, avatar: true, email: true },
        },
      },
    })
  }

  // Từ chối lời mời kết bạn
  async rejectFriendRequest(requesterId: number, receiverId: number) {
    return this.prisma.friendship.delete({
      where: {
        requesterId_receiverId: { requesterId, receiverId },
      },
    })
  }

  // Xóa bạn bè (xóa friendship)
  async deleteFriendship(userId: number, friendId: number) {
    // Tìm friendship (có thể là requesterId hoặc receiverId)
    const friendship = await this.prisma.friendship.findFirst({
      where: {
        OR: [
          { requesterId: userId, receiverId: friendId },
          { requesterId: friendId, receiverId: userId },
        ],
        status: 'ACCEPTED',
      },
    })

    if (!friendship) {
      throw new Error('Không tìm thấy mối quan hệ bạn bè')
    }

    return this.prisma.friendship.delete({
      where: {
        requesterId_receiverId: {
          requesterId: friendship.requesterId,
          receiverId: friendship.receiverId,
        },
      },
    })
  }
}

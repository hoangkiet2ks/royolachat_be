import { Injectable, BadRequestException, NotFoundException, Inject, forwardRef } from '@nestjs/common'
import { FriendRepository } from './friend.repo'
import { SearchUserBody, AddFriendBody, AcceptFriendBody } from './friend.model'
import { ChatGateway } from '../chat/chat.gateway'

@Injectable()
export class FriendService {
  constructor(
    private friendRepo: FriendRepository,
    @Inject(forwardRef(() => ChatGateway))
    private chatGateway: ChatGateway,
  ) {}

  // Tìm kiếm user theo số điện thoại
  async searchUser(userId: number, body: SearchUserBody) {
    const user = await this.friendRepo.findUserByPhoneNumber(body.phoneNumber)

    if (!user) {
      throw new NotFoundException('Không tìm thấy người dùng với số điện thoại này')
    }

    if (user.id === userId) {
      throw new BadRequestException('Không thể kết bạn với chính mình')
    }

    // Kiểm tra trạng thái kết bạn
    const existing = await this.friendRepo.checkFriendshipStatus(userId, user.id)
    if (existing) {
      if (existing.status === 'ACCEPTED') {
        throw new BadRequestException('Đã là bạn với người dùng này rồi')
      }
      if (existing.status === 'PENDING') {
        throw new BadRequestException('Đã gửi lời mời kết bạn cho người dùng này')
      }
    }

    return user
  }

  // Gửi lời mời kết bạn
  async addFriend(userId: number, body: AddFriendBody) {
    if (userId === body.receiverId) {
      throw new BadRequestException('Không thể kết bạn với chính mình')
    }

    // Kiểm tra receiver có tồn tại không
    const receiver = await this.friendRepo.findUserById(body.receiverId)
    if (!receiver) {
      throw new NotFoundException('Người nhận không tồn tại')
    }

    // Kiểm tra đã kết bạn hay chưa
    const existing = await this.friendRepo.checkFriendshipStatus(userId, body.receiverId)
    if (existing) {
      if (existing.status === 'ACCEPTED') {
        throw new BadRequestException('Đã là bạn rồi')
      }
      if (existing.status === 'PENDING') {
        throw new BadRequestException('Đã gửi lời mời rồi')
      }
    }

    const friendship = await this.friendRepo.createFriendRequest(userId, body.receiverId)

    // Lấy thông tin người gửi để gửi thông báo
    const requester = await this.friendRepo.findUserById(userId)
    if (requester) {
      this.chatGateway.notifyFriendRequest(body.receiverId, {
        id: requester.id,
        name: requester.name,
        avatar: requester.avatar,
      })
    }

    return friendship
  }

  // Chấp nhận lời mời kết bạn
  async acceptFriend(userId: number, body: AcceptFriendBody) {
    const friendship = await this.friendRepo.checkFriendshipStatus(body.requesterId, userId)

    if (!friendship) {
      throw new NotFoundException('Không tìm thấy lời mời kết bạn')
    }

    if (friendship.status !== 'PENDING') {
      throw new BadRequestException(
        `Không thể chấp nhận. Trạng thái hiện tại: ${friendship.status}`,
      )
    }

    return this.friendRepo.acceptFriendRequest(body.requesterId, userId)
  }

  // Lấy danh sách bạn bè
  async getFriendList(userId: number) {
    return this.friendRepo.getFriendList(userId)
  }

  // Lấy danh sách lời mời chờ xử lý
  async getPendingRequests(userId: number) {
    return this.friendRepo.getPendingRequests(userId)
  }

  // Từ chối lời mời kết bạn
  async rejectFriend(userId: number, body: AcceptFriendBody) {
    const friendship = await this.friendRepo.checkFriendshipStatus(body.requesterId, userId)

    if (!friendship) {
      throw new NotFoundException('Không tìm thấy lời mời kết bạn')
    }

    if (friendship.status !== 'PENDING') {
      throw new BadRequestException(
        `Không thể từ chối. Trạng thái hiện tại: ${friendship.status}`,
      )
    }

    return this.friendRepo.rejectFriendRequest(body.requesterId, userId)
  }

  // Xóa bạn bè
  async removeFriend(userId: number, friendId: number) {
    if (userId === friendId) {
      throw new BadRequestException('Không thể xóa chính mình')
    }

    // Tìm friendship giữa 2 người
    const friendship = await this.friendRepo.checkFriendshipStatus(userId, friendId)
    
    if (!friendship) {
      throw new NotFoundException('Không tìm thấy mối quan hệ bạn bè')
    }

    if (friendship.status !== 'ACCEPTED') {
      throw new BadRequestException('Chỉ có thể xóa người đã là bạn')
    }

    // Xóa friendship
    await this.friendRepo.deleteFriendship(userId, friendId)
    
    return { message: 'Đã xóa bạn bè thành công' }
  }
}

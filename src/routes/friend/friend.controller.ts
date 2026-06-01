import { Controller, Post, Get, Body, UseGuards, Param } from '@nestjs/common'
import { FriendService } from './friend.service'
import { AccessTokenGuard } from '../../shared/guards/access-token.guard'
import { ActiveUser } from '../../shared/decorators/active-user.decorator'
import CustomZodValidationPipe from '../../shared/pipes/custom-zod-validation.pipe'
import { AuthType } from '../../shared/constants/auth.constant'
import { Auth } from '../../shared/decorators/auth.decorator'
import {
  SearchUserSchema,
  AddFriendSchema,
  AcceptFriendSchema,
  BlockUserSchema,
  type SearchUserBody,
  type AddFriendBody,
  type AcceptFriendBody,
  type BlockUserBody,
} from './friend.model'

@Controller('friend')
@UseGuards(AccessTokenGuard)
export class FriendController {
  constructor(private friendService: FriendService) {}

  /**
   * Tìm kiếm user theo số điện thoại
   * POST /friend/search
   */
  @Post('search')
  async searchUser(
    @ActiveUser() activeUser: any,
    @Body(new CustomZodValidationPipe(SearchUserSchema)) body: SearchUserBody,
  ) {
    const user = await this.friendService.searchUser(activeUser.userId, body)
    return {
      success: true,
      data: user,
      error: null,
    }
  }

  /**
   * Gửi lời mời kết bạn
   * POST /friend/add
   */
  @Post('add')
  async addFriend(
    @ActiveUser() activeUser: any,
    @Body(new CustomZodValidationPipe(AddFriendSchema)) body: AddFriendBody,
  ) {
    const friendship = await this.friendService.addFriend(activeUser.userId, body)
    return {
      success: true,
      data: friendship,
      error: null,
    }
  }

  /**
   * Chấp nhận lời mời kết bạn
   * POST /friend/accept
   */
  @Post('accept')
  async acceptFriend(
    @ActiveUser() activeUser: any,
    @Body(new CustomZodValidationPipe(AcceptFriendSchema)) body: AcceptFriendBody,
  ) {
    const friendship = await this.friendService.acceptFriend(activeUser.userId, body)
    return {
      success: true,
      data: friendship,
      error: null,
    }
  }

  /**
   * Từ chối lời mời kết bạn
   * POST /friend/reject
   */
  @Post('reject')
  async rejectFriend(
    @ActiveUser() activeUser: any,
    @Body(new CustomZodValidationPipe(AcceptFriendSchema)) body: AcceptFriendBody,
  ) {
    await this.friendService.rejectFriend(activeUser.userId, body)
    return {
      success: true,
      data: null,
      error: null,
    }
  }

  /**
   * Lấy danh sách bạn bè
   * GET /friend/list
   */
  @Get('list')
  async getFriendList(@ActiveUser() activeUser: any) {
    const friends = await this.friendService.getFriendList(activeUser.userId)
    return {
      success: true,
      data: friends,
      error: null,
    }
  }

  /**
   * Lấy danh sách lời mời chờ xử lý
   * GET /friend/pending
   */
  @Get('pending')
  async getPendingRequests(@ActiveUser() activeUser: any) {
    const requests = await this.friendService.getPendingRequests(activeUser.userId)
    return {
      success: true,
      data: requests,
      error: null,
    }
  }

  /**
   * Xóa bạn bè
   * POST /friend/remove
   */
  @Post('remove')
  async removeFriend(
    @ActiveUser() activeUser: any,
    @Body() body: { friendId: number },
  ) {
    const result = await this.friendService.removeFriend(activeUser.userId, body.friendId)
    return {
      success: true,
      data: result,
      error: null,
    }
  }

  /**
   * Chặn người dùng
   * POST /friend/block
   */
  @Post('block')
  async blockUser(
    @ActiveUser() activeUser: any,
    @Body(new CustomZodValidationPipe(BlockUserSchema)) body: BlockUserBody,
  ) {
    const result = await this.friendService.blockUser(activeUser.userId, body)
    return {
      success: true,
      data: result,
      error: null,
    }
  }

  /**
   * Bỏ chặn người dùng
   * POST /friend/unblock
   */
  @Post('unblock')
  async unblockUser(
    @ActiveUser() activeUser: any,
    @Body(new CustomZodValidationPipe(BlockUserSchema)) body: BlockUserBody,
  ) {
    const result = await this.friendService.unblockUser(activeUser.userId, body)
    return {
      success: true,
      data: result,
      error: null,
    }
  }

  /**
   * Lấy danh sách đang chặn
   * GET /friend/blocked
   */
  @Get('blocked')
  async getBlockList(@ActiveUser() activeUser: any) {
    const blocked = await this.friendService.getBlockList(activeUser.userId)
    return {
      success: true,
      data: blocked,
      error: null,
    }
  }

  /**
   * Kiểm tra trạng thái block với một người cụ thể
   * GET /friend/block-status?userId=xxx  → dùng POST body cho đơn giản
   * POST /friend/block-status
   */
  @Post('block-status')
  async checkBlockStatus(
    @ActiveUser() activeUser: any,
    @Body() body: { userId: number },
  ) {
    const result = await this.friendService.checkBlockStatus(activeUser.userId, body.userId)
    return {
      success: true,
      data: result, // null = không block, { blockedBy } = ai đang chặn
      error: null,
    }
  }
}

import { Controller, Get, Param, Query, UseGuards, ParseIntPipe, Post, Body, UseInterceptors, UploadedFile, BadRequestException, Delete, Patch, Req } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ChatService } from './chat.service';
import { AccessTokenGuard } from '../../shared/guards/access-token.guard';
import { ActiveUser } from '../../shared/decorators/active-user.decorator'; 
import { IsOptional, IsString } from 'class-validator';

export class UpdateGroupInfoDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  avatar?: string;
}

@Controller('chat')
@UseGuards(AccessTokenGuard) 
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get(':conversationId/messages')
  async getChatHistory(
    @Param('conversationId', ParseIntPipe) conversationId: number,
    @ActiveUser() user: any, // Đảm bảo có dòng này để lấy user hiện tại
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    const userId = Number(user?.sub || user?.userId || user?.id);
    const take = limit ? parseInt(limit, 10) : 50;
    const skip = offset ? parseInt(offset, 10) : 0;
    
    // Truyền thêm userId vào đây
    const messages = await this.chatService.getMessages(conversationId, userId, take, skip);
    return messages.reverse(); 
  }

  @Post('conversation/1v1')
  async getOrCreateConversation(
    @ActiveUser() user: any,
    @Body('friendId', ParseIntPipe) friendId: number
  ) {
    // 1. IN RA ĐỂ KIỂM TRA XEM TOKEN TRẢ VỀ CÁI GÌ
    console.log('--- DEBUG API TẠO PHÒNG CHAT ---');
    console.log('Dữ liệu user từ Token:', user);
    console.log('ID người bạn (friendId):', friendId);

    // 2. Tùy vào kết quả in ra, nếu user chính là một con số thì lấy luôn, 
    // nếu là object thì tìm thuộc tính chứa ID
    let userId: number;
    if (typeof user === 'number') {
      userId = user;
    } else {
      userId = Number(user?.sub || user?.userId || user?.id);
    }
    
    console.log('UserId chốt để tạo:', userId);
    console.log('---------------------------------');

    if (!userId || isNaN(userId)) {
      throw new BadRequestException('Không thể xác định ID của bạn từ Token');
    }

    return this.chatService.getOrCreateOneToOneConversation(userId, friendId);
  }

  //lay thong tin nguoi chat
  @Get('conversation/:id')
  async getConversationInfo(
    @Param('id', ParseIntPipe) id: number,
    @ActiveUser() user: any
  ) {
    const userId = Number(user?.sub || user?.userId || user?.id);
    return this.chatService.getConversationInfo(id, userId);
  }

  //lay thong tin tab chat
  @Get('conversations')
  async getConversations(@ActiveUser() user: any) {
    const userId = Number(user?.sub || user?.userId || user?.id);
    return this.chatService.getRecentConversations(userId);
  }

// API MỚI: Nhận file từ Frontend và đẩy lên S3
  @Post('upload')
  @UseInterceptors(FileInterceptor('file')) // 'file' là tên field từ Frontend gửi lên
  async uploadChatFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Không tìm thấy file tải lên');
    }

    try {
      const fileUrl = await this.chatService.uploadToS3(file);
      
      // Xác định loại tin nhắn là ẢNH hay FILE để báo cho Frontend
      const type = file.mimetype.startsWith('image/') ? 'IMAGE' : 'FILE';

      return {
        status: 'success',
        fileUrl: fileUrl,
        type: type,
        fileName: file.originalname // Trả về tên để lỡ gửi file word/pdf thì còn hiển thị tên
      };
    } catch (error) {
      console.error('Lỗi upload S3:', error);
      throw new BadRequestException('Lỗi khi tải file lên hệ thống');
    }
  }

  // API MỚI: Xử lý request Tạo nhóm
  @Post('conversation/group')
  async createGroup(
    @ActiveUser() user: any,
    @Body('name') name: string,
    @Body('memberIds') memberIds: number[]
  ) {
    const userId = Number(user?.sub || user?.userId || user?.id);
    
    if (!name || name.trim() === '') {
      throw new BadRequestException('Tên nhóm không được để trống');
    }
    if (!Array.isArray(memberIds) || memberIds.length === 0) {
      throw new BadRequestException('Vui lòng chọn ít nhất 1 thành viên khác để tạo nhóm');
    }

    try {
      return await this.chatService.createGroupConversation(userId, name, memberIds);
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }

  // ==========================================
  // TRỌN BỘ ENDPOINT QUẢN LÝ NHÓM CHAT
  // ==========================================

  // 1. Xin thêm thành viên (Vào hàng chờ hoặc thêm luôn)
  @Post('group/:id/add-members')
  async requestAddMembers(
    @Param('id', ParseIntPipe) conversationId: number,
    @ActiveUser() user: any,
    @Body('memberIds') memberIds: number[]
  ) {
    try {
      const userId = Number(user?.sub || user?.userId || user?.id);
      return await this.chatService.requestAddMembers(conversationId, userId, memberIds);
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }

  // 2. Lấy danh sách đang chờ duyệt
  @Get('group/:id/pending-requests')
  async getPendingRequests(@Param('id', ParseIntPipe) conversationId: number, @ActiveUser() user: any) {
    try {
      const userId = Number(user?.sub || user?.userId || user?.id);
      return await this.chatService.getPendingJoinRequests(conversationId, userId);
    } catch (error: any) { throw new BadRequestException(error.message); }
  }

  // 3. Trưởng nhóm Duyệt
  @Post('group/request/:requestId/approve')
  async approveRequest(@Param('requestId', ParseIntPipe) requestId: number, @ActiveUser() user: any) {
    try {
      const userId = Number(user?.sub || user?.userId || user?.id);
      await this.chatService.approveJoinRequest(requestId, userId);
      return { status: 'success', message: 'Đã phê duyệt thành viên' };
    } catch (error: any) { throw new BadRequestException(error.message); }
  }

  // 4. Trưởng nhóm Từ chối
  @Post('group/request/:requestId/reject')
  async rejectRequest(@Param('requestId', ParseIntPipe) requestId: number, @ActiveUser() user: any) {
    try {
      const userId = Number(user?.sub || user?.userId || user?.id);
      await this.chatService.rejectJoinRequest(requestId, userId);
      return { status: 'success', message: 'Đã từ chối thành viên' };
    } catch (error: any) { throw new BadRequestException(error.message); }
  }

  // 5. Mời ra khỏi nhóm (Kick) - LỖI 404 NẰM Ở ĐÂY LÀ DO THIẾU HÀM NÀY
  @Post('group/:id/kick')
  async kickMember(
    @Param('id', ParseIntPipe) conversationId: number,
    @ActiveUser() user: any,
    @Body('targetUserId') targetUserId: number
  ) {
    try {
      const userId = Number(user?.sub || user?.userId || user?.id);
      await this.chatService.kickMember(conversationId, userId, targetUserId);
      return { status: 'success', message: 'Đã xóa thành viên khỏi nhóm' };
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }

  // 6. Phân quyền (Thăng/Giáng cấp) - VÀ THIẾU CẢ HÀM NÀY NỮA
  @Post('group/:id/role')
  async assignRole(
    @Param('id', ParseIntPipe) conversationId: number,
    @ActiveUser() user: any,
    @Body('targetUserId') targetUserId: number,
    @Body('role') role: string
  ) {
    try {
      const userId = Number(user?.sub || user?.userId || user?.id);
      await this.chatService.assignRole(conversationId, userId, targetUserId, role);
      return { status: 'success', message: 'Cập nhật quyền thành công' };
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }

  // 7. Giải tán nhóm
  @Delete('group/:id/disband')
  async disbandGroup(
    @Param('id', ParseIntPipe) conversationId: number,
    @ActiveUser() user: any
  ) {
    try {
      const userId = Number(user?.sub || user?.userId || user?.id);
      await this.chatService.disbandGroup(conversationId, userId);
      return { status: 'success', message: 'Đã giải tán nhóm' };
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }

 // Cập nhật thông tin nhóm (Tên/Avatar)
  @Patch('group/:id/info')
  async updateGroupInfo(
    @Param('id', ParseIntPipe) conversationId: number,
    @ActiveUser() user: any,
    @Body() body: UpdateGroupInfoDto // <-- SỬ DỤNG DTO ĐỂ NESTJS CHO PHÉP ĐI QUA
  ) {
    try {
      const userId = Number(user?.sub || user?.userId || user?.id);
      
      if (!body.name && !body.avatar) {
        throw new Error('Không có dữ liệu hợp lệ để cập nhật');
      }

      await this.chatService.updateGroupInfo(conversationId, userId, body);
      return { status: 'success', message: 'Cập nhật thông tin nhóm thành công' };
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }

  //Xóa Lịch Sử Cuộc trò chuyện
  @Delete('conversation/:id/history')
  // @UseGuards(JwtAuthGuard) // Nhớ bật Guard nếu bạn đang dùng để chặn người lạ
  async clearHistory(
    @Param('id') conversationId: string, 
    @Req() req: any
  ) {
    // Lấy ID người dùng từ token (tùy cách bạn setup payload, thường là req.user.userId hoặc req.user.id)
    const userId = req.user?.userId || req.user?.id; 

    await this.chatService.clearConversationHistory(Number(conversationId), userId);
    
    return { 
      status: 'success', 
      message: 'Đã xóa toàn bộ lịch sử cuộc trò chuyện' 
    };
  }

  // Trưởng nhóm rời nhóm và nhượng quyền
  @Post('group/:id/leave')
  async leaveGroup(
    @Param('id') conversationId: string, 
    @Req() req: any,
    @Body('newAdminId') newAdminId?: number
  ) {
    const userId = req.user?.userId || req.user?.id;
    return await this.chatService.leaveGroup(Number(conversationId), userId, newAdminId);
  }

  //Pin tin nhắn 
  @Get('conversation/:id/pins')
  async getPinnedMessages(@Param('id') conversationId: string) {
    return await this.chatService.getPinnedMessages(Number(conversationId));
  }
  
}
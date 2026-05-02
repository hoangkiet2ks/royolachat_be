// src/routes/chat/chat.module.ts
import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { ChatController } from './chat.controller'; // Thêm dòng này
import { PrismaService } from '../../shared/services/prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({})],
  controllers: [ChatController], // Thêm controller vào đây
  providers: [ChatGateway, ChatService, PrismaService],
  exports: [ChatGateway], // Export ChatGateway để FriendModule có thể dùng
})
export class ChatModule {}
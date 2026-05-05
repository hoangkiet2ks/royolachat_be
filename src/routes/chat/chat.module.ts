// src/routes/chat/chat.module.ts
import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { ChatController } from './chat.controller';
import { PrismaService } from '../../shared/services/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { AiModule } from '../ai/ai.module';

@Module({
  imports: [JwtModule.register({}), AiModule],
  controllers: [ChatController],
  providers: [ChatGateway, ChatService, PrismaService],
  exports: [ChatGateway],
})
export class ChatModule {}
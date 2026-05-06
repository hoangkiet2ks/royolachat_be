import { Module, OnModuleInit } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { SharedModule } from './shared/shared.module'
import { AuthModule } from './routes/auth/auth.module'
import { FriendModule } from './routes/friend/friend.module'
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { ZodSerializerInterceptor } from 'nestjs-zod'
import { ChatModule } from './routes/chat/chat.module';
import { AiModule } from './routes/ai/ai.module';
import { AiService } from './routes/ai/ai.service';
import { PrismaService } from './shared/services/prisma.service';
import { HashingService } from './shared/services/hashing.service';
import CustomZodValidationPipe from './shared/pipes/custom-zod-validation.pipe'
import { v4 as uuidv4 } from 'uuid';

@Module({
  imports: [SharedModule, AuthModule, FriendModule, ChatModule], // Tạm thời bỏ AiModule
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: CustomZodValidationPipe,
    },
    { provide: APP_INTERCEPTOR, useClass: ZodSerializerInterceptor },
  ],
})
export class AppModule {
  // Tạm thời bỏ onModuleInit để không seed bot
}

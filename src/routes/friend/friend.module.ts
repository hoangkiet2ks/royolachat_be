import { Module, forwardRef } from '@nestjs/common'
import { FriendController } from './friend.controller'
import { FriendService } from './friend.service'
import { FriendRepository } from './friend.repo'
import { SharedModule } from '../../shared/shared.module'
import { ChatModule } from '../chat/chat.module'

@Module({
  imports: [SharedModule, forwardRef(() => ChatModule)],
  controllers: [FriendController],
  providers: [FriendService, FriendRepository],
  exports: [FriendService, FriendRepository],
})
export class FriendModule {}

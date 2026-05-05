import { Controller, Post, Body } from '@nestjs/common';
import { AiService } from './ai.service';
import { SmartReplyDto, ToneEditDto, SmartReplyResponse, ToneEditResponse } from './ai.dto';
import { ActiveUser } from '../../shared/decorators/active-user.decorator';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('smart-reply')
  async smartReply(
    @Body() dto: SmartReplyDto,
    @ActiveUser() user: { userId: number },
  ): Promise<SmartReplyResponse> {
    try {
      const suggestions = await this.aiService.getSmartReplies({
        messageContent: dto.messageContent,
        userId: user.userId,
      });
      return { suggestions };
    } catch (err: any) {
      if (err.message === 'RATE_LIMIT_EXCEEDED') {
        return {
          suggestions: [],
          error: 'Bạn đã đạt giới hạn sử dụng AI. Vui lòng thử lại sau 1 giờ.',
        };
      }
      return { suggestions: [], error: 'Không thể tạo gợi ý lúc này.' };
    }
  }

  @Post('tone-edit')
  async toneEdit(
    @Body() dto: ToneEditDto,
    @ActiveUser() user: { userId: number },
  ): Promise<ToneEditResponse> {
    try {
      const result = await this.aiService.editTone({
        text: dto.text,
        mode: dto.mode,
        userId: user.userId,
      });
      return { result };
    } catch (err: any) {
      if (err.message === 'RATE_LIMIT_EXCEEDED') {
        return {
          result: dto.text,
          error: 'Bạn đã đạt giới hạn sử dụng AI. Vui lòng thử lại sau 1 giờ.',
        };
      }
      return { result: dto.text, error: 'Không thể chỉnh sửa lúc này.' };
    }
  }
}

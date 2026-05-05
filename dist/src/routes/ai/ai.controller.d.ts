import { AiService } from './ai.service';
import { SmartReplyDto, ToneEditDto, SmartReplyResponse, ToneEditResponse } from './ai.dto';
export declare class AiController {
    private readonly aiService;
    constructor(aiService: AiService);
    smartReply(dto: SmartReplyDto, user: {
        userId: number;
    }): Promise<SmartReplyResponse>;
    toneEdit(dto: ToneEditDto, user: {
        userId: number;
    }): Promise<ToneEditResponse>;
}

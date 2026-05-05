"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiController = void 0;
const common_1 = require("@nestjs/common");
const ai_service_1 = require("./ai.service");
const ai_dto_1 = require("./ai.dto");
const active_user_decorator_1 = require("../../shared/decorators/active-user.decorator");
let AiController = class AiController {
    constructor(aiService) {
        this.aiService = aiService;
    }
    async smartReply(dto, user) {
        try {
            const suggestions = await this.aiService.getSmartReplies({
                messageContent: dto.messageContent,
                userId: user.userId,
            });
            return { suggestions };
        }
        catch (err) {
            if (err.message === 'RATE_LIMIT_EXCEEDED') {
                return {
                    suggestions: [],
                    error: 'Bạn đã đạt giới hạn sử dụng AI. Vui lòng thử lại sau 1 giờ.',
                };
            }
            return { suggestions: [], error: 'Không thể tạo gợi ý lúc này.' };
        }
    }
    async toneEdit(dto, user) {
        try {
            const result = await this.aiService.editTone({
                text: dto.text,
                mode: dto.mode,
                userId: user.userId,
            });
            return { result };
        }
        catch (err) {
            if (err.message === 'RATE_LIMIT_EXCEEDED') {
                return {
                    result: dto.text,
                    error: 'Bạn đã đạt giới hạn sử dụng AI. Vui lòng thử lại sau 1 giờ.',
                };
            }
            return { result: dto.text, error: 'Không thể chỉnh sửa lúc này.' };
        }
    }
};
exports.AiController = AiController;
__decorate([
    (0, common_1.Post)('smart-reply'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, active_user_decorator_1.ActiveUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ai_dto_1.SmartReplyDto, Object]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "smartReply", null);
__decorate([
    (0, common_1.Post)('tone-edit'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, active_user_decorator_1.ActiveUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ai_dto_1.ToneEditDto, Object]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "toneEdit", null);
exports.AiController = AiController = __decorate([
    (0, common_1.Controller)('ai'),
    __metadata("design:paramtypes", [ai_service_1.AiService])
], AiController);
//# sourceMappingURL=ai.controller.js.map
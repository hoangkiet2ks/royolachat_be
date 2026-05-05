"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToneEditDto = exports.SmartReplyDto = exports.ToneEditSchema = exports.SmartReplySchema = void 0;
const zod_1 = require("zod");
const nestjs_zod_1 = require("nestjs-zod");
exports.SmartReplySchema = zod_1.z.object({
    messageContent: zod_1.z.string().min(1).max(2000),
});
exports.ToneEditSchema = zod_1.z.object({
    text: zod_1.z.string().min(5).max(2000),
    mode: zod_1.z.enum(['polite', 'grammar']),
});
class SmartReplyDto extends (0, nestjs_zod_1.createZodDto)(exports.SmartReplySchema) {
}
exports.SmartReplyDto = SmartReplyDto;
class ToneEditDto extends (0, nestjs_zod_1.createZodDto)(exports.ToneEditSchema) {
}
exports.ToneEditDto = ToneEditDto;
//# sourceMappingURL=ai.dto.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageResDTO = void 0;
const nestjs_zod_1 = require("nestjs-zod");
const response_model_1 = require("../models/response.model");
class MessageResDTO extends (0, nestjs_zod_1.createZodDto)(response_model_1.MessageResSchema) {
}
exports.MessageResDTO = MessageResDTO;
//# sourceMappingURL=response.dto.js.map
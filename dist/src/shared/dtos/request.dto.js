"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmptyBodyDTO = void 0;
const nestjs_zod_1 = require("nestjs-zod");
const request_model_1 = require("../models/request.model");
class EmptyBodyDTO extends (0, nestjs_zod_1.createZodDto)(request_model_1.EmptyBodySchema) {
}
exports.EmptyBodyDTO = EmptyBodyDTO;
//# sourceMappingURL=request.dto.js.map
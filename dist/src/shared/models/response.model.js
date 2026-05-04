"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageResSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.MessageResSchema = zod_1.default.object({
    message: zod_1.default.string(),
});
//# sourceMappingURL=response.model.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const nestjs_zod_1 = require("nestjs-zod");
const zod_1 = require("zod");
const CustomZodValidationPipe = (0, nestjs_zod_1.createZodValidationPipe)({
    createValidationException: (error) => {
        if (error instanceof zod_1.ZodError) {
            return new common_1.UnprocessableEntityException({
                errors: error.issues.map((issue) => ({
                    code: issue.code,
                    path: issue.path.join('.'),
                    message: issue.message,
                })),
            });
        }
        return new common_1.UnprocessableEntityException({
            errors: [
                {
                    code: 'unknown',
                    path: '',
                    message: 'Validation failed',
                },
            ],
        });
    },
});
exports.default = CustomZodValidationPipe;
//# sourceMappingURL=custom-zod-validation.pipe.js.map
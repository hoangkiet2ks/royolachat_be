"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("./services/prisma.service");
const hashing_service_1 = require("./services/hashing.service");
const token_service_1 = require("./services/token.service");
const jwt_1 = require("@nestjs/jwt");
const email_service_1 = require("./services/email.service");
const access_token_guard_1 = require("./guards/access-token.guard");
const s3_service_1 = require("./services/s3.service");
const core_1 = require("@nestjs/core");
const sharedServices = [
    prisma_service_1.PrismaService,
    hashing_service_1.HashingService,
    token_service_1.TokenService,
    email_service_1.EmailService,
    s3_service_1.S3Service,
];
const sharedProviders = [
    ...sharedServices,
    {
        provide: core_1.APP_GUARD,
        useClass: access_token_guard_1.AccessTokenGuard,
    },
];
let SharedModule = class SharedModule {
};
exports.SharedModule = SharedModule;
exports.SharedModule = SharedModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: sharedProviders,
        exports: sharedServices,
        imports: [jwt_1.JwtModule],
    })
], SharedModule);
//# sourceMappingURL=shared.module.js.map
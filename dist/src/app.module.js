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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const shared_module_1 = require("./shared/shared.module");
const auth_module_1 = require("./routes/auth/auth.module");
const friend_module_1 = require("./routes/friend/friend.module");
const core_1 = require("@nestjs/core");
const nestjs_zod_1 = require("nestjs-zod");
const chat_module_1 = require("./routes/chat/chat.module");
const ai_module_1 = require("./routes/ai/ai.module");
const ai_service_1 = require("./routes/ai/ai.service");
const prisma_service_1 = require("./shared/services/prisma.service");
const hashing_service_1 = require("./shared/services/hashing.service");
const custom_zod_validation_pipe_1 = __importDefault(require("./shared/pipes/custom-zod-validation.pipe"));
const uuid_1 = require("uuid");
let AppModule = class AppModule {
    constructor(prisma, hashingService, aiService) {
        this.prisma = prisma;
        this.hashingService = hashingService;
        this.aiService = aiService;
    }
    async onModuleInit() {
        await this.seedBotUser();
    }
    async seedBotUser() {
        try {
            const randomPassword = await this.hashingService.hash((0, uuid_1.v4)());
            const bot = await this.prisma.user.upsert({
                where: { email: 'royolabot@system.internal' },
                update: {},
                create: {
                    email: 'royolabot@system.internal',
                    name: 'RoyolaBot',
                    password: randomPassword,
                    phoneNumber: '0000000000',
                    isBot: true,
                    status: 'ACTIVE',
                },
            });
            process.env.BOT_USER_ID = String(bot.id);
            this.aiService.setBotUserId(bot.id);
            console.log(`[Bot] RoyolaBot seeded with id: ${bot.id}`);
        }
        catch (err) {
            console.error('[Bot] Failed to seed bot user:', err);
        }
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [shared_module_1.SharedModule, auth_module_1.AuthModule, friend_module_1.FriendModule, chat_module_1.ChatModule, ai_module_1.AiModule],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_PIPE,
                useClass: custom_zod_validation_pipe_1.default,
            },
            { provide: core_1.APP_INTERCEPTOR, useClass: nestjs_zod_1.ZodSerializerInterceptor },
        ],
    }),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        hashing_service_1.HashingService,
        ai_service_1.AiService])
], AppModule);
//# sourceMappingURL=app.module.js.map
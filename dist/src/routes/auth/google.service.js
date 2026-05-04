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
exports.GoogleService = void 0;
const config_1 = __importDefault(require("../../shared/config"));
const auth_constant_1 = require("../../shared/constants/auth.constant");
const common_1 = require("@nestjs/common");
const googleapis_1 = require("googleapis");
const uuid_1 = require("uuid");
const auth_repo_1 = require("./auth.repo");
const auth_service_1 = require("./auth.service");
const hashing_service_1 = require("../../shared/services/hashing.service");
const auth_error_1 = require("./auth.error");
let GoogleService = class GoogleService {
    constructor(authRepository, hashingService, authService) {
        this.authRepository = authRepository;
        this.hashingService = hashingService;
        this.authService = authService;
        this.oauth2Client = new googleapis_1.google.auth.OAuth2(config_1.default.GOOGLE_CLIENT_ID, config_1.default.GOOGLE_CLIENT_SECRET, config_1.default.GOOGLE_REDIRECT_URI);
    }
    async getAuthorizationUrl({ userAgent, ip }) {
        const scope = [
            'openid',
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email',
        ];
        const stateString = Buffer.from(JSON.stringify({
            userAgent,
            ip,
        })).toString('base64');
        const url = this.oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope,
            include_granted_scopes: true,
            state: stateString,
            prompt: 'consent',
        });
        return { url };
    }
    async googleCallback({ code, state }) {
        try {
            let userAgent = 'Unknown';
            let ip = 'Unknown';
            try {
                if (state) {
                    const clientInfo = JSON.parse(Buffer.from(state, 'base64').toString());
                    userAgent = clientInfo.userAgent;
                    ip = clientInfo.ip;
                }
            }
            catch (error) {
                console.error('Error parsing state', error);
            }
            const { tokens } = await this.oauth2Client.getToken(code);
            this.oauth2Client.setCredentials(tokens);
            const oauth2 = googleapis_1.google.oauth2({
                auth: this.oauth2Client,
                version: 'v2',
            });
            const { data } = await oauth2.userinfo.get();
            if (!data.email) {
                throw auth_error_1.GoogleUserInfoError;
            }
            let user = await this.authRepository.findUniqueUser({
                email: data.email,
            });
            if (!user) {
                const randomPassword = (0, uuid_1.v4)();
                const hashedPassword = await this.hashingService.hash(randomPassword);
                user = await this.authRepository.findUniqueUser({
                    email: (await this.authRepository.createUser({
                        email: data.email,
                        name: data.name ?? '',
                        password: hashedPassword,
                        phoneNumber: '',
                        avatar: data.picture ?? null,
                        appRole: auth_constant_1.AppRole.USER,
                        status: auth_constant_1.UserStatus.ACTIVE,
                    })).email,
                });
            }
            if (!user) {
                throw auth_error_1.GoogleUserInfoError;
            }
            const device = await this.authRepository.createDevice({
                userId: user.id,
                userAgent,
                ip,
                isActive: true,
            });
            await this.authRepository.updateUser({ id: user.id }, {
                lastSeenAt: new Date(),
            });
            return this.authService.generateTokens({
                userId: user.id,
                deviceId: device.id,
                appRole: user.appRole,
            });
        }
        catch (error) {
            console.error('Error in googleCallback', error);
            throw error;
        }
    }
};
exports.GoogleService = GoogleService;
exports.GoogleService = GoogleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_repo_1.AuthRepository,
        hashing_service_1.HashingService,
        auth_service_1.AuthService])
], GoogleService);
//# sourceMappingURL=google.service.js.map
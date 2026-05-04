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
exports.S3Service = void 0;
const common_1 = require("@nestjs/common");
const client_s3_1 = require("@aws-sdk/client-s3");
const uuid_1 = require("uuid");
const config_1 = __importDefault(require("../config"));
require("multer");
let S3Service = class S3Service {
    constructor() {
        this.s3Client = new client_s3_1.S3Client({
            region: config_1.default.AWS_REGION,
            credentials: {
                accessKeyId: config_1.default.AWS_ACCESS_KEY_ID,
                secretAccessKey: config_1.default.AWS_SECRET_ACCESS_KEY,
            },
        });
    }
    async uploadImage(file, folder = 'chats') {
        try {
            const fileExtension = file.originalname.split('.').pop();
            const fileName = `${folder}/${(0, uuid_1.v4)()}.${fileExtension}`;
            const command = new client_s3_1.PutObjectCommand({
                Bucket: config_1.default.AWS_S3_BUCKET_NAME,
                Key: fileName,
                Body: file.buffer,
                ContentType: file.mimetype,
            });
            await this.s3Client.send(command);
            return `https://${config_1.default.AWS_S3_BUCKET_NAME}.s3.${config_1.default.AWS_REGION}.amazonaws.com/${fileName}`;
        }
        catch (error) {
            console.error('S3 Upload Error:', error);
            throw new common_1.InternalServerErrorException('Không thể tải ảnh lên hệ thống, vui lòng thử lại.');
        }
    }
    async deleteFile(fileUrl) {
        try {
            const urlParts = fileUrl.split('.com/');
            if (urlParts.length < 2)
                return;
            const key = urlParts[1];
            const command = new client_s3_1.DeleteObjectCommand({
                Bucket: config_1.default.AWS_S3_BUCKET_NAME,
                Key: key,
            });
            await this.s3Client.send(command);
        }
        catch (error) {
            console.error('S3 Delete Error:', error);
        }
    }
};
exports.S3Service = S3Service;
exports.S3Service = S3Service = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], S3Service);
//# sourceMappingURL=s3.service.js.map
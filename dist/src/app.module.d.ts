import { OnModuleInit } from '@nestjs/common';
import { AiService } from './routes/ai/ai.service';
import { PrismaService } from './shared/services/prisma.service';
import { HashingService } from './shared/services/hashing.service';
export declare class AppModule implements OnModuleInit {
    private readonly prisma;
    private readonly hashingService;
    private readonly aiService;
    constructor(prisma: PrismaService, hashingService: HashingService, aiService: AiService);
    onModuleInit(): Promise<void>;
    private seedBotUser;
}

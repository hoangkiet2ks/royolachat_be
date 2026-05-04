"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: [
            'https://royolachat.netlify.app',
            'http://localhost:3300',
            'http://localhost:5173',
            /\.netlify\.app$/,
            /\.nip\.io$/,
        ],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Authorization', 'Content-Type'],
    });
    const port = process.env.PORT || 3000;
    await app.listen(port, '0.0.0.0');
    console.log(`Application is running on port: ${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map
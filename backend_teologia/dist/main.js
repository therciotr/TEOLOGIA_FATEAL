"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const express_1 = require("express");
const all_exceptions_filter_1 = require("./common/filters/all-exceptions.filter");
const logging_interceptor_1 = require("./common/interceptors/logging.interceptor");
const prisma_service_1 = require("./prisma/prisma.service");
const core_2 = require("@nestjs/core");
const dotenv = __importStar(require("dotenv"));
async function bootstrap() {
    var _a, _b, _c;
    dotenv.config();
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const logger = new common_1.Logger('Bootstrap');
    const port = Number(process.env.PORT) || 3000;
    const appUrl = (_a = process.env.APP_URL) !== null && _a !== void 0 ? _a : `http://localhost:${port}`;
    const globalPrefix = 'api';
    const versionPrefix = 'v1';
    app.setGlobalPrefix(globalPrefix);
    app.use((0, helmet_1.default)({ contentSecurityPolicy: false }));
    app.use((0, compression_1.default)());
    const { httpAdapter } = app.get(core_2.HttpAdapterHost);
    if ('getInstance' in httpAdapter) {
        httpAdapter.getInstance().set('trust proxy', true);
    }
    app.use((0, express_1.json)({ limit: '10mb' }));
    app.use((0, express_1.urlencoded)({ extended: true, limit: '10mb' }));
    const corsOrigins = ((_b = process.env.CORS_ORIGIN) !== null && _b !== void 0 ? _b : '*')
        .split(',')
        .map((o) => o.trim())
        .filter(Boolean);
    app.enableCors({
        origin: corsOrigins.length ? corsOrigins : '*',
        credentials: true,
    });
    app.enableVersioning({
        type: common_1.VersioningType.URI,
        defaultVersion: versionPrefix,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.useGlobalFilters(new all_exceptions_filter_1.AllExceptionsFilter());
    app.useGlobalInterceptors(new logging_interceptor_1.LoggingInterceptor());
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('API Teologia FATEAL')
        .setDescription('Documentação oficial da API FATEAL')
        .setVersion((_c = process.env.npm_package_version) !== null && _c !== void 0 ? _c : '1.0.0')
        .addBearerAuth()
        .addServer(`${appUrl}/${globalPrefix}/${versionPrefix}`)
        .setContact('TR Tecnologias', 'https://trsystemas.com.br', 'suporte@trsystemas.com.br')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup(`${globalPrefix}/docs`, app, document);
    await app.get(prisma_service_1.PrismaService).enableShutdownHooks(app);
    await app.listen(port, '0.0.0.0');
    logger.log(`🚀 API online: ${appUrl}/${globalPrefix}/${versionPrefix}/status`);
    logger.log(`📘 Swagger:   ${appUrl}/${globalPrefix}/docs`);
}
bootstrap();

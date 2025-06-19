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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseModule = exports.FIREBASE_APP = exports.FIREBASE_ADMIN = exports.FIRESTORE = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const admin = __importStar(require("firebase-admin"));
exports.FIRESTORE = 'FIRESTORE';
exports.FIREBASE_ADMIN = 'FIREBASE_ADMIN';
exports.FIREBASE_APP = 'FIREBASE_APP';
let FirebaseModule = class FirebaseModule {
};
exports.FirebaseModule = FirebaseModule;
exports.FirebaseModule = FirebaseModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [config_1.ConfigModule],
        providers: [
            {
                provide: exports.FIREBASE_APP,
                inject: [config_1.ConfigService],
                useFactory: (config) => {
                    const logger = new common_1.Logger('FirebaseModule');
                    const credPath = config.get('GOOGLE_APPLICATION_CREDENTIALS');
                    if (!admin.apps.length) {
                        if (credPath) {
                            logger.log(`Inicializando Firebase com credenciais: ${credPath}`);
                            const serviceAccount = require(credPath);
                            admin.initializeApp({
                                credential: admin.credential.cert(serviceAccount),
                            });
                        }
                        else {
                            logger.warn('GOOGLE_APPLICATION_CREDENTIALS não definida; usando applicationDefault()');
                            admin.initializeApp({
                                credential: admin.credential.applicationDefault(),
                            });
                        }
                    }
                    return admin.app();
                },
            },
            {
                provide: exports.FIRESTORE,
                inject: [exports.FIREBASE_APP],
                useFactory: (app) => app.firestore(),
            },
            {
                provide: exports.FIREBASE_ADMIN,
                useValue: admin,
            },
        ],
        exports: [exports.FIREBASE_APP, exports.FIRESTORE, exports.FIREBASE_ADMIN],
    })
], FirebaseModule);
//# sourceMappingURL=firebase.module.js.map
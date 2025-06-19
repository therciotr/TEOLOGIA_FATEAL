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
exports.FirebaseModule = exports.FIRESTORE_PROVIDER = exports.FIRESTORE_PROVIDER_STR = exports.FIRESTORE = exports.FIREBASE_ADMIN = exports.FIREBASE_APP = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const admin = __importStar(require("firebase-admin"));
exports.FIREBASE_APP = Symbol.for('FIREBASE_APP');
exports.FIREBASE_ADMIN = Symbol.for('FIREBASE_ADMIN');
exports.FIRESTORE = Symbol.for('FIRESTORE');
exports.FIRESTORE_PROVIDER_STR = 'FIRESTORE_PROVIDER';
exports.FIRESTORE_PROVIDER = exports.FIRESTORE_PROVIDER_STR;
const firestoreProvider = {
    provide: exports.FIRESTORE,
    inject: [exports.FIREBASE_APP],
    useFactory: (app) => app.firestore(),
};
const legacyAliasProvider = {
    provide: exports.FIRESTORE_PROVIDER,
    useExisting: exports.FIRESTORE,
};
let FirebaseModule = class FirebaseModule {
    onApplicationShutdown() {
        admin.apps.forEach(app => { var _a; return (_a = app === null || app === void 0 ? void 0 : app.delete) === null || _a === void 0 ? void 0 : _a.call(app).catch(() => null); });
    }
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
                    var _a;
                    const log = new common_1.Logger('FirebaseModule');
                    const name = (_a = config.get('FIREBASE_APP_NAME')) !== null && _a !== void 0 ? _a : '[default]';
                    const credPath = config.get('GOOGLE_APPLICATION_CREDENTIALS');
                    if (!admin.apps.some(app => (app === null || app === void 0 ? void 0 : app.name) === name)) {
                        if (credPath === null || credPath === void 0 ? void 0 : credPath.trim()) {
                            log.log(`Inicializando Firebase (${name}) com ${credPath}`);
                            const svc = require(credPath);
                            admin.initializeApp({ credential: admin.credential.cert(svc) }, name);
                        }
                        else {
                            log.warn('Sem credenciais — usando applicationDefault()');
                            admin.initializeApp({ credential: admin.credential.applicationDefault() }, name);
                        }
                    }
                    const emulator = config.get('FIRESTORE_EMULATOR_HOST');
                    if (emulator === null || emulator === void 0 ? void 0 : emulator.trim()) {
                        log.warn(`⚠️  Firestore EMULATOR ativo em ${emulator}`);
                        process.env.FIRESTORE_EMULATOR_HOST = emulator;
                    }
                    return admin.app(name);
                },
            },
            { provide: exports.FIREBASE_ADMIN, useValue: admin },
            firestoreProvider,
            legacyAliasProvider,
        ],
        exports: [
            exports.FIREBASE_APP,
            exports.FIREBASE_ADMIN,
            exports.FIRESTORE,
            exports.FIRESTORE_PROVIDER,
            exports.FIRESTORE_PROVIDER_STR,
        ],
    })
], FirebaseModule);

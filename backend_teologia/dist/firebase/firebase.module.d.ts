import { OnApplicationShutdown } from '@nestjs/common';
export declare const FIREBASE_APP: unique symbol;
export declare const FIREBASE_ADMIN: unique symbol;
export declare const FIRESTORE: unique symbol;
export declare const FIRESTORE_PROVIDER_STR = "FIRESTORE_PROVIDER";
export declare const FIRESTORE_PROVIDER = "FIRESTORE_PROVIDER";
export declare class FirebaseModule implements OnApplicationShutdown {
    onApplicationShutdown(): void;
}

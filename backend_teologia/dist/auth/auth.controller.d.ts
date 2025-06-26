import { AuthService } from './auth.service';
declare class LoginDto {
    email: string;
    senha: string;
}
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: LoginDto): Promise<{
        access_token: string;
        usuario: {
            id: string;
            nome: string;
            email: string;
            perfil: string;
        };
    }>;
}
export {};

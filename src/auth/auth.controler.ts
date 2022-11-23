import { Body, Controller, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { AuthService } from "./auth.service";
import { SignInBodyDto, SignUpBodyDto } from "./dto";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("signup")
    async signUp(@Body() body: SignUpBodyDto, @Res() response: Response): Promise<Response> {
        const { fullName, email, login, password } = body;

        const signUpResult = await this.authService.signUp(fullName, email, login, password);

        if (signUpResult) {
            return response.status(200).json({
                "message": "Usuário criado com sucesso!"
            });
        }

        return response.status(401).json({
            "message": "Login ou email já estão sendo usados."
        });
    }
    
    @Post("signin")
    async signIn(@Body() body: SignInBodyDto, @Res() response: Response): Promise<Response> {
        const { login, password } = body;

        const singInResult = await this.authService.signIn(login, password);

        if (singInResult) {
            return response.status(200).json({
                "message": "Usuário logado com sucesso!"
            });
        }

        return response.status(401).json({
            "message": "Login ou senha inválidos."
        });
    }
}
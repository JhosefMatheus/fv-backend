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

        const { flag, message } = await this.authService.signUp(fullName, email, login, password);

        if (flag) {
            return response.status(200).json({
                message: message
            });
        }

        return response.status(401).json({
            message: message
        });
    }
    
    @Post("signin")
    async signIn(@Body() body: SignInBodyDto, @Res() response: Response): Promise<Response> {
        const { login, password } = body;

        const { flag, message ,token } = await this.authService.signIn(login, password);

        if (flag) {
            return response.status(200).json({
                message: message,
                token: token
            });
        }

        return response.status(401).json({
            message: message
        });
    }
}
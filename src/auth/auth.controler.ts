import { Controller, Post, Req } from "@nestjs/common";
import { Request } from "express";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("signup")
    signUp(@Req() req: Request) {
        const { fullName, email, login, password } = req.body;

        this.authService.signUp(fullName, email, login, password);
    }
    
    @Post("signin")
    signIn(@Req() req: Request) {
        const { login, password } = req.body;

        this.authService.signIn(login, password);
    }
}
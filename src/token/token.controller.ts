import { Controller, Get, Headers, Res } from "@nestjs/common";
import { Response } from "express";
import { TokenDto } from "./dto";
import { TokenService } from "./token.service";

@Controller("token")
export class TokenController {
    constructor(private readonly tokenService: TokenService) {}

    @Get("verify")
    async verify(@Headers() headers: TokenDto, @Res() response: Response): Promise<Response> {
        const token: string = headers.authorization.replace("Bearer ", "");

        const { flag, message, userInfo } = await this.tokenService.tokenVerify(token);

        if (flag) {
            return response.status(200).json({
                message: message,
                userInfo: userInfo
            });
        }

        return response.status(401).json({
            message: message
        });
    }
}
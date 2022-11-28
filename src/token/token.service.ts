import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { TokenVerifyInterface } from "./dto";

@Injectable()
export class TokenService {
    constructor(private readonly jwtService: JwtService, private readonly config: ConfigService) {}

    async tokenVerify(token: string): Promise<TokenVerifyInterface> {
        const tokenOptions: object = {
            secret: this.config.get("JWT_SECRET")
        }

        try {
            const tokenVerify: any = await this.jwtService.verifyAsync(token, tokenOptions);

            return {
                flag: true,
                message: "token válido",
                userInfo: tokenVerify
            }
        } catch (error) {
            return {
                flag: false,
                message: "token inválido"
            }
        }
    }
}
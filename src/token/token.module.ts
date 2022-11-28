import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { TokenController } from "./token.controller";
import { TokenService } from "./token.service";

@Module({
    imports: [JwtModule.register({}), ConfigModule],
    controllers: [TokenController],
    providers: [TokenService]
})
export class TokenModule {}
import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controler";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [JwtModule.register({}), ConfigModule],
    providers: [AuthService],
    controllers: [AuthController]
})
export class AuthModule {}
import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controler";
import { AuthService } from "./auth.service";

@Module({
    providers: [AuthService],
    controllers: [AuthController]
})
export class AuthModule {}
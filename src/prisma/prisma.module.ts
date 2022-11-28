import { Module, Global } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { ConfigModule } from "@nestjs/config/dist";

@Global()
@Module({
    imports: [ConfigModule],
    providers: [PrismaService],
    exports: [PrismaService]
})
export class PrismaModule {}
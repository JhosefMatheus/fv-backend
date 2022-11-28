import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import * as argon2 from "argon2";
import { PrismaService } from "src/prisma/prisma.service";
import { SignUpSignInAuthService } from "./dto";

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService, private readonly config: ConfigService) {}

    async createToken(userId: number, fullName: string, email: string, login: string): Promise<string> {
        const jwtPayload: object = {
            sub: userId,
            fullName: fullName,
            email: email,
            login: login
        }

        const jwtOptions: object = {
            expiresIn: "2d",
            secret: this.config.get("JWT_SECRET")
        }

        const token: string = await this.jwtService.signAsync(jwtPayload, jwtOptions);

        return token
    }

    async signUp(fullName: string, email: string, login: string, password: string): Promise<SignUpSignInAuthService> {
        const hashedPassword: string = await argon2.hash(password);

        const verifyLoginEmail: User = await this.prisma.user.findFirst({
            where: {
                OR: [
                    {
                        email: {
                            equals: email
                        }
                    },
                    {
                        login: {
                            equals: login
                        }
                    }
                ]
            }
        });

        if (!verifyLoginEmail) {
            const newUser: User = await this.prisma.user.create({
                data: {
                    fullName: fullName,
                    email: email,
                    login: login,
                    password: hashedPassword
                }
            });

            return {
                flag: true,
                message: "Usuário criado com sucesso!"
            };
        }

        return {
            flag: false,
            message: "Login ou email já estão sendo usados."
        };
    }
    
    async signIn(login: string, password: string): Promise<SignUpSignInAuthService> {
        const userVerify: User = await this.prisma.user.findFirst({
            where: {
                login: login
            }
        });

        if (userVerify) {
            const hashedPassword: string = userVerify.password;

            const verifyHashedPassword: boolean = await argon2.verify(hashedPassword, password);

            if (verifyHashedPassword) {
                const token: string = await this.createToken(userVerify.id, userVerify.fullName, userVerify.email, userVerify.login);

                return {
                    flag: true,
                    message: "Usuário logado com sucesso!",
                    token: token
                };
            }
        }

        return {
            flag: false,
            message: "Login ou senha inválidos."
        };
    }
}
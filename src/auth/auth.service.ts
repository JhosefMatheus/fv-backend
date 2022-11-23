import { Injectable } from "@nestjs/common";
import * as argon2 from "argon2";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService) {}

    async signUp(fullName: string, email: string, login: string, password: string): Promise<boolean> {
        const hashedPassword = await argon2.hash(password);

        const verifyLoginEmail = await this.prisma.user.findFirst({
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
            const newUser = await this.prisma.user.create({
                data: {
                    fullName: fullName,
                    email: email,
                    login: login,
                    password: hashedPassword
                }
            });

            return true;
        }

        return false
    }
    
    async signIn(login: string, password: string): Promise<boolean> {
        const userVerify = await this.prisma.user.findFirst({
            where: {
                login: login
            }
        });

        if (userVerify) {
            const hashedPassword = userVerify.password;

            const verifyHashedPassword = await argon2.verify(hashedPassword, password);

            if (verifyHashedPassword) {
                return true
            }
        }

        return false;
    }
}
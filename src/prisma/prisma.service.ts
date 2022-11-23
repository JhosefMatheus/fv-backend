import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient {
    constructor () {
        super({
            datasources: {
                db: {
                    url: "mysql://root:Bambam&xx12@localhost:3306/fv"
                }
            }
        });
    }
}
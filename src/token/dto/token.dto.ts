import { IsNotEmpty, IsString } from "class-validator";

export class TokenDto {
    @IsNotEmpty()
    @IsString()
    authorization: string;

    [props: string]: any;
}

interface UserInfo {
    userId: number;
    fullName: string;
    email: string;
    login: string;
}

export interface TokenVerifyInterface {
    flag: boolean;
    message: string;
    userInfo?: UserInfo;
}
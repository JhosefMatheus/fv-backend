import { IsNotEmpty, IsEmail } from "class-validator";

export class SignInBodyDto {
    @IsNotEmpty()
    login: string;

    @IsNotEmpty()
    password: string;
}

export class SignUpBodyDto {
    @IsNotEmpty()
    fullName: string;
    
    @IsNotEmpty()
    @IsEmail()
    email: string;
    
    @IsNotEmpty()
    login: string;
    
    @IsNotEmpty()
    password: string;
}

export interface SignUpSignInAuthService {
    flag: boolean;
    message: string;
    token?: string;
}
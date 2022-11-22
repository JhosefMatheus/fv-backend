import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
    signUp(fullName: string, email: string, login: string, password: string) {
        console.log(fullName, email, login, password);
    }
    
    signIn(login: string, password: string) {
        console.log(login, password);
    }
}
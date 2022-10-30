import { Injectable } from '@nestjs/common';
import { generateHash, validateHash } from 'src/common/utils';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserInput } from '../user/dto/create-user.input';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) { }

    async validateUser(username: string, inp_password: string): Promise<any> {
        const user = await this.userService.findByUserName(username);
        if (user && validateHash(inp_password, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    login(user: User): any {
        return {
            access_token: this.getAccessToken(user),
            user
        };
    }

    async signUp(createUserInput: CreateUserInput): Promise<any> {
        await this.userService.create(createUserInput);
        const { email } = createUserInput; 
        const user = await this.userService.findByUserName(email);
        return {
            access_token: this.getAccessToken(user),
            user
        }
    }

    getAccessToken(user: User): any {
        return this.jwtService.sign({
            username: user.email,
            sub: user.id,
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) //1 day
        });
    }
}

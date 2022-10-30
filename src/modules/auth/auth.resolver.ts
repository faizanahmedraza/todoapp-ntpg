import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login-response';
import { LoginUserInput } from './dto/login-user.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { Public } from './decorators/public.decorator';
import { CreateUserInput } from '../user/dto/create-user.input';
import { SignUpResponse } from './dto/signup-response';

@Resolver()
export class AuthResolver {
    constructor(private authService: AuthService) { }

    @Public()
    @UseGuards(GqlAuthGuard)
    @Mutation(() => LoginResponse)
    login(@Args('loginUserInput') loginUserInput: LoginUserInput, @Context() context) {
        return this.authService.login(context.user);
    }

    @Public()
    @Mutation(() => SignUpResponse)
    signup(@Args('signupUserInput') signupUserInput: CreateUserInput) {
        return this.authService.signUp(signupUserInput);
    }
}

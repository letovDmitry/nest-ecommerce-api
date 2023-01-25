import { Controller, Post, Body, HttpCode } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common/enums";
import { AuthService } from "./auth.service";
import { SigninDto, SignupDto } from "./dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
        
    }

    @Post('signup')
    signup(@Body() dto: SignupDto) {
        return this.authService.signup(dto)
    } 

    @Post('signup-admin')
    signupAdmin(@Body() dto: SignupDto) {
        return this.authService.signupAdmin(dto)
    } 

    @HttpCode(HttpStatus.OK)
    @Post('signin')
    signin(@Body() dto: SigninDto) {
        return this.authService.signin(dto)
    }
}
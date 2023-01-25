import { IsBoolean, IsEmail } from "class-validator"
import { IsNotEmpty, IsString } from "class-validator"

export class SignupDto {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string

    @IsString()
    phoneNumber?: string

    @IsString()
    firstName?: string

    @IsString()
    lastName?: string

    @IsString()
    city?: string

    @IsString()
    pointOfIssue?: string
}
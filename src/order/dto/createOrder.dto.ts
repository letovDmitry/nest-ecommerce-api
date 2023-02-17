import { IsArray, IsNotEmpty, IsString } from "class-validator"

export class CreateOrderDto {
    @IsNotEmpty()
    @IsArray()
    itemsIds: number[]

    @IsNotEmpty()
    @IsString()
    city: string

    @IsNotEmpty()
    @IsString()
    poinOfIssue: string

    @IsNotEmpty()
    @IsString()
    email: string

    @IsNotEmpty()
    @IsString()
    phone: string

    @IsNotEmpty()
    @IsString()
    name: string
}
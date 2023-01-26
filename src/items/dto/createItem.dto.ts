import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateItemDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsNumber()
    price: number

    @IsOptional()
    @IsNumber()
    sale?: number

    @IsArray()
    @IsNotEmpty()
    sizes: string[]

    @IsString()
    @IsNotEmpty()
    sex: string

    @IsOptional()
    @IsString()
    description?: string

    @IsNotEmpty()
    @IsString()
    color: string

    @IsNotEmpty()
    @IsString()
    brand: string

    @IsNotEmpty()
    @IsString()
    type: string

    @IsOptional()
    @IsString()
    img: string

    @IsNotEmpty()
    @IsNumber()
    inStock: number


}
import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class EditItemDto {
    @IsOptional()
    @IsString()
    name?: string

    @IsOptional()
    @IsNumber()
    price?: number

    @IsOptional()
    @IsNumber()
    sale?: number

    @IsArray()
    @IsOptional()
    sizes?: string[]

    @IsString()
    @IsOptional()
    sex?: string

    @IsOptional()
    @IsString()
    description?: string

    @IsOptional()
    @IsString()
    color?: string

    @IsOptional()
    @IsString()
    brand?: string

    @IsOptional()
    @IsString()
    type?: string

    @IsOptional()
    @IsArray()
    img?: string[]

    @IsOptional()
    @IsNumber()
    inStock?: number

}
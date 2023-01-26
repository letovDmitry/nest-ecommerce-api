import { IsArray, IsNotEmpty } from "class-validator"

export class CreateOrderDto {
    @IsNotEmpty()
    @IsArray()
    itemsIds: number[]
}
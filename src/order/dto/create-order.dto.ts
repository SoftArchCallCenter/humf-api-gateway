import { ArrayNotEmpty, IsNotEmpty, IsNumber, IsString } from "class-validator"

class Menu {
    
    @IsNotEmpty()
    @IsNumber()
    id: number

    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsNumber()
    price: number

    @IsString()
    description: string

    @IsNotEmpty()
    @IsNumber()
    quatity: number
}

export class CreateOrderDto {
    
    @IsNotEmpty()
    @IsNumber()
    userId: number

    @IsNotEmpty()
    @IsNumber()
    resId: number

    @ArrayNotEmpty()
    menus: Menu[]
}
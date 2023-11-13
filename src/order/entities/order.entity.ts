import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Menu {
    @Prop({required: true})
    name: string

    @Prop({required: true})
    quantity: number

    @Prop({required: true})
    price: number

    @Prop({required: true})
    description: string
}

@Schema()
export class Order {
    @Prop({required: true})
    userId: string

    @Prop({required: true})
    resId: string

    @Prop()
    menus: Menu[]
}

export const OrderSchema = SchemaFactory.createForClass(Order);
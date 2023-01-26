import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { OrderService } from 'src/order/order.service';
import { PrismaService } from 'src/prisma/prisma.service';
import * as Yookassa from 'yookassa'
import { PaymentDto, PaymentStatusDto } from './dto';

const yooKassa = new Yookassa({
    shopId: process.env.SHOP_ID,
    secretKey: process.env.SECRET_KEY
})

@Injectable()
export class PaymentService {
    constructor(private prisma: PrismaService) {}
    
    async payment(dto: PaymentDto) {
        const ordersCount = this.prisma.order.findMany().then(i => i.length)

        const payment = await yooKassa.createPayment({
            amount: {
              value: dto.amount.toFixed(2),
              currency: "RUB"
            },
            payment_method_data: {
                type: "bank_card"
            },
            confirmation: {
              type: "redirect",
              return_url: "https://www.merchant-website.com/return_url"
            },
            description: `Заказ №${await ordersCount}`
        });

        return payment
    }

    async getPaymentStatus(dto: PaymentStatusDto) {
        if (dto.event !== 'payment.waiting_for_capture') return

        console.log(dto)

        const payment = await yooKassa.capturePayment(
            dto.object.id,
            dto.object.amount
        )
        
        console.log(payment.id)

        const paymentId: string = payment.id

        const order = await this.prisma.order.update({
            where: {
                orderId: paymentId
            },
            data: {
                status: 'Оплачено'
            }
        })

        console.log(order)
    }

}

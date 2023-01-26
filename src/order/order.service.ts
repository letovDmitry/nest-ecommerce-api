import { Injectable, ForbiddenException } from '@nestjs/common';
import { PaymentService } from 'src/payment/payment.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto';

@Injectable()
export class OrderService {
    constructor(private prisma: PrismaService, private readonly paymentService: PaymentService) {}

    async getAllOrders(role: boolean) {
        if (!role) throw new ForbiddenException()

        return await this.prisma.order.findMany({
            include: {
                items: true
            }
        })
    }

    async getUserOrders(userId: number) {
        return await this.prisma.order.findMany({
            where: {
                userId
            },
            include: {
                items: true
            }
        })
    }

    async createOrder(userId: number, dto: CreateOrderDto) {
        const itemsList = dto.itemsIds.map(i => ({id: i}))

        const items = await this.prisma.item.findMany({
            where: {
                OR: itemsList
            }
        })

        let amount = 0

        for (let i of items) {
            if (i.sale) {
                amount+=i.sale
            } else {
                amount+=i.price
            }
        }

        const payment = await this.paymentService.payment({ amount })
        
        const newOrder = await this.prisma.order.create({
            data: {
                userId,
                status: "В ожидании оплаты",
                orderId: payment.id,
                items: {
                    connect: itemsList
                }
            }
        })

        return {...newOrder, ...payment.confirmation}
    }

    async editOrderStatus(role: boolean, orderId: number, updatedStatus: string) {
        if (!role) throw new ForbiddenException()

        return await this.prisma.order.update({
            where: {
                id: orderId
            },
            data: {
                status: updatedStatus
            }
        })
    }
}

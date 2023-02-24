import { Injectable, ForbiddenException } from '@nestjs/common';
import { PaymentService } from 'src/payment/payment.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto';
import axios from 'axios'

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

        const items = await this.prisma.basketItem.findMany({
            where: {
                OR: itemsList
            }
        })

        let amount = 0

        for (let i of items) {
            if (i.sale) {
                amount+=i.price - i.price*(i.sale/100)
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
                city: dto.city,
                pointOfIssue: dto.poinOfIssue,
                email: dto.email,
                phone: dto.phone,
                name: dto.name,
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

    async getCities() {
        const { data: token } = await axios.post(`https://api.edu.cdek.ru/v2/oauth/token?grant_type=client_credentials&client_id=${process.env.ACCOUNT}&client_secret=${process.env.SECURE_PASSWORD}`)
        const { data: citiesList } = await axios.get(`https://api.cdek.ru/v2/location/cities`, { headers: {'Authorization': `Bearer ${token.access_token}`} })
        console.log(token)
        console.log(citiesList)
        console.log(process.env.ACCOUNT)
        console.log(process.env.SECURE_PASSWORD)
        return citiesList
    }
}

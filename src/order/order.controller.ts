import { Controller, UseGuards, Post, ParseIntPipe, Get, Param } from '@nestjs/common';
import { Patch } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { PaymentService } from 'src/payment/payment.service';
import { CreateOrderDto } from './dto';
import { OrderService } from './order.service';

@UseGuards(JwtGuard)
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('cities')
  async getCities() {
    return await this.orderService.getCities()
  }

  @Get('all')
  getAllOrders(@GetUser('role') role: boolean) {
    return this.orderService.getAllOrders(role)
  }

  @Post()
  createOrder(@GetUser('id', ParseIntPipe) userId: number, @Body() dto: CreateOrderDto) {
    return this.orderService.createOrder(userId, dto)
  }

  @Get()
  getUserOrders(@GetUser('id', ParseIntPipe) userId: number) {
    return this.orderService.getUserOrders(userId)
  }

  @Patch(':id')
  editOrderStatus(@GetUser('role') role: boolean, @Body() dto: { updatedStatus: string }, @Param('id', ParseIntPipe) orderId: number) {
    return this.orderService.editOrderStatus(role, orderId, dto.updatedStatus)
  }

}

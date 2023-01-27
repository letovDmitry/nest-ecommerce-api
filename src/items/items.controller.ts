import { Controller, Get, UseGuards, Param, ParseIntPipe, Query, Post, Patch, Delete, Body } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { BypassAuth } from 'src/auth/decorator/bypassAuth.decorator';
import { JwtGuard } from 'src/auth/guard';
import { CreateItemDto, EditItemDto } from './dto';
import { ItemsService } from './items.service';

@UseGuards(JwtGuard)
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post('/basket')
  addToBasket(@GetUser('id', ParseIntPipe) userId: number, @Body() dto: { id: number }) {
      return this.itemsService.addToBasket(userId, dto.id)
  }

  @Get('/basket')
  getBasket(@GetUser('id', ParseIntPipe) userId: number) {
    return this.itemsService.getBasket(userId)
  }

  @Delete('/basket')
  deleteFromBasket(@GetUser('id', ParseIntPipe) userId: number, @Body() dto: { id: number }) {
    return this.itemsService.deleteFromBasket(userId, dto.id)
  }



  @Post('/favourites')
  addToFavourites(@GetUser('id', ParseIntPipe) userId: number, @Body() dto: { id: number }) {
      return this.itemsService.addToFavourites(userId, dto.id)
  }

  @Get('/favourites')
  getFavorites(@GetUser('id', ParseIntPipe) userId: number) {
    return this.itemsService.getFavourites(userId)
  }

  @Delete('/favourites')
  deleteFromFavourites(@GetUser('id', ParseIntPipe) userId: number, @Body() dto: { id: number }) {
    return this.itemsService.deleteFromFavourites(userId, dto.id)
  }

  @BypassAuth()
  @Get()
  getItems(@Query() queryParams) {
    return this.itemsService.getItems(queryParams)
  }

  @BypassAuth()
  @Get(':id')
  getItemById(@Param('id', ParseIntPipe) itemId: number) {
    return this.itemsService.getItemById(itemId)
  }

  @Post()
  createItem(@GetUser('role') role: boolean, @Body() dto: CreateItemDto) {
      return this.itemsService.createItem(role, dto)
  }

  @Patch(':id')
  editItemById(@GetUser('role') role: boolean, @Body() dto: EditItemDto, @Param('id', ParseIntPipe) itemId: number) {
      return this.itemsService.editItemById(role, dto, itemId)
  }

  @Delete(':id') 
  deleteItemById(@GetUser('role') role: boolean, @Param('id', ParseIntPipe) itemId: number) {
      return this.itemsService.deleteItemById(role, itemId)
  }
}
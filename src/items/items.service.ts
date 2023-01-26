import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateItemDto, EditItemDto } from './dto';

@Injectable()
export class ItemsService {
    constructor(private prisma: PrismaService) {}
    
    async getItems(queryParams) {
        const { page = 1, brand, sex } = queryParams
        const items = await this.prisma.item.findMany({
            skip: (parseInt(page)-1)*20,
            take: 20,
            where: {
                brandName: brand ? brand : {},
                sex: sex ? sex : {}
            }
        })
        for (let i of items) {
            delete i.createdAt
            delete i.publicationDate
            delete i.updatedAt
            delete i.sizes
            delete i.sex
        }

        return items
    }

    getItemById(itemId: number) {
        return this.prisma.item.findMany({
            where: {
                id: itemId
            }
        })
    }

    async createItem(role: boolean, dto: any) {
        if (!role) throw new ForbiddenException()

        return await this.prisma.item.create({
            data: {
                ...dto,
                brand: {
                    connectOrCreate: {
                        where: {
                            name: dto.brand
                        },
                        create: {
                            name: dto.brand
                        }
                    }
                }
            }
        })
    }

    async editItemById(role: boolean, dto: any, itemId: number) {
        if (!role) throw new ForbiddenException()
        
        return await this.prisma.item.update({
            where: {
                id: itemId,

            },
            data: {
                ...dto,
                brand: {
                    connectOrCreate: {
                        where: {
                            name: dto.brand
                        },
                        create: {
                            name: dto.brand
                        }
                    }
                }
            }
        })
    }

    async deleteItemById(role: boolean, itemId: number) {
        if (!role) throw new ForbiddenException()

        await this.prisma.item.delete({
            where: {
                id: itemId
            }
        })
    }




    async addToBasket(userId, itemId) {
        const updatedBasket = await this.prisma.basket.update({
            where: {
                userId
            },
            data: {
              items: {
                connect: {
                    id: itemId
                }
              }
            },
            include: {
                items: true
            }
          })

        return updatedBasket
    }

    async deleteFromBasket(userId, itemId) {
        const updatedBasket = await this.prisma.basket.update({
            where: {
                userId
            },
            data: {
              items: {
                disconnect: {
                    id: itemId
                }
              }
            },
            include: {
                items: true
            }
          })

        return updatedBasket
    }

    async getBasket(userId) {
        const basket = await this.prisma.basket.findUnique({
            where: {
                userId
            },
            include: {
                items: true
            }
        })

        return basket.items
    }



    async addToFavourites(userId, itemId) {
        const updatedFavouriets = await this.prisma.favourites.update({
            where: {
                userId
            },
            data: {
              items: {
                connect: {
                    id: itemId
                }
              }
            },
            include: {
                items: true
            }
          })

        return updatedFavouriets
    }

    async deleteFromFavourites(userId, itemId) {
        const updatedFavourites = await this.prisma.favourites.update({
            where: {
                userId
            },
            data: {
              items: {
                disconnect: {
                    id: itemId
                }
              }
            },
            include: {
                items: true
            }
          })

        return updatedFavourites
    }

    async getFavourites(userId) {
        const favourites = await this.prisma.favourites.findUnique({
            where: {
                userId
            },
            include: {
                items: true
            }
        })

        return favourites.items
    }
}

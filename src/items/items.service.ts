import { ConflictException, Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { captalizeFirstLetterOfEachWordInPhrase } from 'src/helpers/captialize';
import { Items } from '@prisma/client';

@Injectable()
export class ItemsService {
  constructor(private prismaService : PrismaService) {}

    async create(createItemDto: CreateItemDto) {
    createItemDto.name = captalizeFirstLetterOfEachWordInPhrase(CreateItemDto.name);

    return this.prismaService.$transaction(async (tx) => {
    const item= await this.prismaService.items.upsert({
      where: {
        name: createItemDto.name,
      },
      update:{},
      create:{
        name: createItemDto.name,
          quantity : createItemDto.quantity,
          price : createItemDto.price,

          ...(createItemDto.description && {
            description : createItemDto.description,
          }),
          ...(createItemDto.discount && {
            discount : createItemDto.discount,
          }),
          ...(createItemDto.DiscountType && {
            discount_type : createItemDto.DiscountType,
          }),
          ...(createItemDto.tax && {
            tax : createItemDto.tax,
          }),
      },
    });
    const itemsOrganization = await this.prismaService.itemsOrganization.findFirst({
      where: {
        item_id: item.id,
        organization_id: createItemDto.organization_id,
      },

    });
    if(itemsOrganization){
      throw new ConflictException('This item has been added!');
    }
     await this.prismaService.itemsOrganization.create({
      data: {
        item_id: item.id,
        organization_id: createItemDto.organization_id
      },
     });
    return item;
   },
  )}

  findAll() {
    return `This action returns all items`;
  }

  findOne(id: number) {
    return `This action returns a #${id} item`;
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    return `This action updates a #${id} item`;
  }

  remove(id: number) {
    return `This action removes a #${id} item`;
  }
}
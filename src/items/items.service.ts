import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { captalizeFirstLetterOfEachWordInPhrase } from 'src/helpers/captialize';
import { Items } from '@prisma/client';
import { Item } from './entities/item.entity';
import { runInThisContext } from 'vm';

@Injectable()
export class ItemsService {
  constructor(private prismaService : PrismaService) {}

    async create(createItemDto: CreateItemDto) {
    createItemDto.name = captalizeFirstLetterOfEachWordInPhrase(createItemDto.name);

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

    async findAll(organization_id : number) {
    return this.prismaService.itemsOrganization.findMany({
      where: {organization_id},
      include:{
        items: true,
      },
    });
  }

   async findOne(id: number , organization_id: number) {
    return this.getItemById(id, organization_id);
  }

   async update(id: number, updateItemDto: UpdateItemDto) {
    const itemOrganization = await this.getItemById(id , updateItemDto.organization_id);

    updateItemDto.name = captalizeFirstLetterOfEachWordInPhrase(updateItemDto.name);
   return this.prismaService.items.update({
    where: {
      id: itemOrganization.item_id,
    },
    data: {
      ...(updateItemDto.name && {name:captalizeFirstLetterOfEachWordInPhrase(updateItemDto.name) }),
      ...(updateItemDto.quantity && { quantity: updateItemDto.quantity}),
      ...(updateItemDto.DiscountType && { discount_type : updateItemDto.DiscountType}),
      ...(updateItemDto.description && { description : updateItemDto.description}),
      ...(updateItemDto.discount && { discount : updateItemDto.discount}),
      ...(updateItemDto.price && {price : updateItemDto.price}),
      ...(updateItemDto.tax && {tax : updateItemDto.tax})
    }
   });

    //return `This action updates a #${id} item`
  }

   async remove(id: number , organization_id: number) {
    await this.getItemById( id , organization_id)
    return this.prismaService.items.delete({where :{id ,}
    });
  }

  private async getItemById(id: number , organization_id: number) {
    const item = await this.prismaService.itemsOrganization.findFirst({
      where: {
        item_id: id,
        organization_id: organization_id,
      },
      include:{
      items: true,
      },
     });

    if (!item) {
      throw new NotFoundException(`Item with id ${id} does not exist`);
    }

    return item;
  }
}

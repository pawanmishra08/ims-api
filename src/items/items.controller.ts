import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { user } from '@prisma/client';
import { request } from 'express';

interface ItemRequest extends Request{
  payload: user;
}

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  create(
    @Body() createItemDto: CreateItemDto,
    @Req()  request: ItemRequest,
  ){
    createItemDto.organization_id = request?.payload?.organization_id;
    return this.itemsService.create(createItemDto);
  }

  @Get()
  findAll( @Req() request : ItemRequest ) {
    return this.itemsService.findAll(request.payload?.organization_id);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Req() request: ItemRequest  ,  ) {
    return this.itemsService.findOne(+id , request.payload?.organization_id);
  }

  @Patch(':id')
  update(@Param('id') id: string,
   @Body() updateItemDto: UpdateItemDto,
   @Req() request: ItemRequest) {
    updateItemDto.organization_id = request.payload?.organization_id
    return this.itemsService.update(+id, updateItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string,
   @Req() request: ItemRequest) {
    return this.itemsService.remove(+id ,request.payload?.organization_id);
  }
}

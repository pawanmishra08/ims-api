import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustomervendorsService } from './customervendors.service';
import { CreateCustomervendorDto } from './dto/create-customervendor.dto';
import { UpdateCustomervendorDto } from './dto/update-customervendor.dto';

@Controller('customervendors')
export class CustomervendorsController {
 constructor(private readonly customervendorsService: CustomervendorsService) {}

  @Post()
  create(@Body() createCustomervendorDto: CreateCustomervendorDto) {
    return this.customervendorsService.create(createCustomervendorDto);
  }

  @Get()
  findAll() {
    return this.customervendorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customervendorsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomervendorDto: UpdateCustomervendorDto) {
    return this.customervendorsService.update(+id, updateCustomervendorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customervendorsService.remove(+id);
  }
}

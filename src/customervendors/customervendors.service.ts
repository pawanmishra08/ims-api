import { Injectable } from '@nestjs/common';
import { CreateCustomervendorDto } from './dto/create-customervendor.dto';
import { UpdateCustomervendorDto } from './dto/update-customervendor.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CustomervendorsService {

 constructor (private prismaservice: PrismaService){}

  create(createCustomervendorDto: CreateCustomervendorDto) {
    return 'This action adds a new customervendor';
  }

  findAll() {
    return `This action returns all customervendors`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customervendor`;
  }

  update(id: number, updateCustomervendorDto: UpdateCustomervendorDto) {
    return `This action updates a #${id} customervendor`;
  }

  remove(id: number) {
    return `This action removes a #${id} customervendor`;
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCustomerVendorDto } from './dto/create-customervendor.dto';
import { UpdateCustomervendorDto } from './dto/update-customervendor.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { captalizeFirstLetterOfEachWordInPhrase } from 'src/helpers/captialize';

@Injectable()
export class CustomervendorsService {
  constructor (private prismaService: PrismaService){}

  async create(createCustomervendorDto: CreateCustomerVendorDto) {
    createCustomervendorDto.name= captalizeFirstLetterOfEachWordInPhrase(createCustomervendorDto.name);

    const customervendor = await this.prismaService.customervendors.findFirst({
      where:{
        name: createCustomervendorDto.name,
      },
    });

    if (customervendor) {
      throw new BadRequestException(`customervendor ${createCustomervendorDto.name}has been alreadyyyyy taken`);
    }
    return this.prismaService.customervendors.create({data: createCustomervendorDto });
  }

  findAll() {
    return this.prismaService.customervendors.findMany();
  }

  findOne(id: number) {
    return this.prismaService.customervendors.findFirst();
  }

  update(id: number, updateCustomervendorDto: UpdateCustomervendorDto) {
    return `This action updates a #${id} customervendor`;
  }

  remove(id: number) {
    return `This action removes a #${id} customervendor`;
  }
}

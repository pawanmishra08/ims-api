import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { captalizeFirstLetterOfEachWordInPhrase } from 'src/helpers/captialize';
import { Organization } from './entities/organization.entity';

@Injectable()
export class OrganizationsService {
  constructor(private prismaservice: PrismaService){}
   
  async create(createOrganizationDto: CreateOrganizationDto) {
    createOrganizationDto.name= captalizeFirstLetterOfEachWordInPhrase(createOrganizationDto.name)
  
    const organization= await this.prismaservice.organization.findFirst({
      where: {
        name: Organization.name,
      },
    });

    if(organization){
      throw new BadRequestException('organization ${organization.name} has already been taken')
    }
    return this.prismaservice.organization.create({data: CreateOrganizationDto})
  }



  findAll() {
    return `This action returns all organizations`;
  }

   findOne(id: number) {
    return `This action returns a #${id} organization`;
  }

  update(id: number, updateOrganizationDto: UpdateOrganizationDto) {
    return `This action updates a #${id} organization`;
  }

  remove(id: number) {
    return `This action removes a #${id} organization`;
  }
}

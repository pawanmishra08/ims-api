import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { captalizeFirstLetterOfEachWordInPhrase } from 'src/helpers/captialize';
import { RolesService } from 'src/roles/roles.service';
import { OrganizationsService } from 'src/organizations/organizations.service';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(private prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const roleservice = new RolesService(this.prismaService)
    const organizationservice = new OrganizationsService(this.prismaService);

    await roleservice.findOne(createUserDto.role_id)
    await organizationservice.findOne(createUserDto.organization_id);

    createUserDto.name= captalizeFirstLetterOfEachWordInPhrase(createUserDto.name)

   if (await this.checkIfEmailExist(createUserDto.email)){
    throw new BadRequestException("this email has been already taken")
   }
   
   if (await this.checkIfmobileExist(createUserDto.mobile)){
    throw new BadRequestException("this email has been already taken")
   }
    createUserDto.password = await hash(createUserDto.password, 10 );
    return this.prismaService.user.create({ data: createUserDto});
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  private async checkIfEmailExist(email: string, id?:number): Promise<boolean> {
    const user = await this.prismaService.user.findUnique({
       where: { email ,}
       });

    if (id) {
     return user ? user.id === id : true;
    }

    return !!user;
  }

  private async checkIfmobileExist(mobile: string, id?:number): Promise<boolean> {
    const user = await this.prismaService.user.findUnique({
       where: { mobile, } });

    if (id) {
     return user? user.id === id : true;
    }

    return !!user;
  }
}

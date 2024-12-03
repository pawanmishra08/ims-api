import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { captalizeFirstLetterOfEachWordInPhrase } from 'src/helpers/captialize';
import { RolesService } from 'src/roles/roles.service';
import { OrganizationsService } from 'src/organizations/organizations.service';
import { hash } from 'bcrypt';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(private prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    // const roleservice = new RolesService(this.prismaService)
    // await roleservice.findOne(createUserDto.role_id)
    const organizationservice = new OrganizationsService(this.prismaService);
    await organizationservice.findOne(createUserDto.organization_id);

    const roleobj= await this.prismaService.role.findFirst({
      where: {
        name: createUserDto.role
      },
    });

    if(!roleobj) {
      throw new NotFoundException (
        `unable to find the role ${createUserDto.role}`
      );
    }
    const { role, ...rest }= createUserDto;

    rest.name= captalizeFirstLetterOfEachWordInPhrase(rest.name)

    if (await this.checkIfEmailExist(rest.email)){
      throw new BadRequestException("this email has been alrrrrready taken")
    }

    if (await this.checkIfmobileExist(rest.mobile)){
      throw new BadRequestException("this mobile has been alrrrready taken")
    }
    rest.password = await hash(rest.password, 10 );

    return this.prismaService.user.create({ data: rest ,});
  }

  findAll() {
    return this.prismaService.user.findMany;
  }

  findOne(id: number) {
    return this.getuserById(id);
  }

   async update(id: number, updateUserDto: UpdateUserDto) {
    await this.getuserById(id);

    const roleservice = new RolesService(this.prismaService)
    const organizationservice = new OrganizationsService(this.prismaService);

    await roleservice.findOne(updateUserDto.role_id)
    await organizationservice.findOne(updateUserDto.organization_id);


    if(updateUserDto.name) {
      updateUserDto.name= captalizeFirstLetterOfEachWordInPhrase(
        updateUserDto.name,
      );
    }
    const { role, ...rest} = updateUserDto;

    if (!await this.checkIfEmailExist(updateUserDto.email ,id)){
      throw new BadRequestException("this email has been arrlready taken")
     }

     if (!await this.checkIfmobileExist(updateUserDto.mobile , id)){
      throw new BadRequestException("this email has been alrrrready taken")
     }

     if(updateUserDto.password){
      updateUserDto.password = await hash(updateUserDto.password, 10)
     }
     return this.prismaService.user.update({
      where: { id },
      data: rest ,
     });

  }

  remove(id: number) {
    return this.getuserById(id);
    return this.prismaService.user.delete({ where: { id }})
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

  private async getuserById(id: number) {
    const organization = await this.prismaService.user.findFirst({ where: { id } });

    if (!User) {
      throw new NotFoundException(`user with id ${id} does not exist`);
    }

    return organization;
  }
}

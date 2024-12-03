import { Module } from '@nestjs/common';
import { CustomervendorsService } from './customervendors.service';
import { CustomervendorsController } from './customervendors.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [CustomervendorsController],
  providers: [CustomervendorsService , PrismaService],
})
export class CustomervendorsModule {}

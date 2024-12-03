import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomervendorDto } from './create-customervendor.dto';

export class UpdateCustomervendorDto extends PartialType(CreateCustomervendorDto) {}

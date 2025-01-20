import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerVendorDto } from './create-customervendor.dto';

export class UpdateCustomervendorDto extends PartialType(CreateCustomerVendorDto) {}

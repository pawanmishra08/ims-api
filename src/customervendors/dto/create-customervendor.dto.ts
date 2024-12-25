import { IsBoolean, IsNumber, IsOptional, isString, IsString, MaxLength } from "class-validator";

export class CreateCustomervendorDto {

    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    Description?: string;

    @IsString()
    @IsOptional()
    email: string;

    @IsNumber()
    @IsOptional()
    @MaxLength(15)
    phone: number;

    @IsString()
    @IsOptional()
    street?: string;

    @IsString()
    @IsOptional()
    city?: string;

    @IsString()
    @IsOptional()
    district?: string;

    @IsString()
    @IsOptional()
    province?: string;

    @IsString()
    @IsOptional()
    is_vendor?: boolean= false;
}

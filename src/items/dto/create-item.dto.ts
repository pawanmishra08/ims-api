import { DiscountType } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateItemDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description : string;

    @IsNotEmpty()
    @IsNumber()
    quantity : number;

    @IsNotEmpty()
    @IsNumber()
    price : number;

    @IsOptional()
    @IsNotEmpty()
    discount : number;

    @IsOptional()
    @IsEnum(DiscountType)
    DiscountType : DiscountType;

    @IsOptional()
    @IsNumber()
    tax : number;

    @IsOptional()
    @IsNumber()
    organization_id : number;
}



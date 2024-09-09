import { organizationType } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsOptional, IsString, Max } from "class-validator";

export class CreateOrganizationDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsEnum(organizationType)
    type: organizationType

    @IsOptional()
    @IsString()
    adress: string;

    @IsOptional()
    @IsString()
    @Max(15)
    phone: string;
}

import { organizationType } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsOptional, IsString, Max, MaxLength } from "class-validator";

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
    @MaxLength(15)
    phone: string;
}

import { Expose } from "class-transformer";
import { IsOptional, IsString } from "class-validator";

export class UpdateLocationDto {
    @Expose()
    @IsOptional()
    @IsString()
    parentId?: string;

    @IsString()
    @IsOptional()
    @Expose()
    name?: string;

    @IsString()
    @IsOptional()
    @Expose()
    level?: string;
}
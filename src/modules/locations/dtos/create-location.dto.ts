import { Expose } from "class-transformer";
import { IsOptional, IsString } from "class-validator";

export class CreateLocationDTO {
    @Expose()
    @IsOptional()
    @IsString()
    parentId?: string;

    @IsString()
    @Expose()
    name: string;

    @IsString()
    @Expose()
    level: string;
}
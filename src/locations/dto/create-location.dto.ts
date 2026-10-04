import { ArrayNotEmpty, IsArray, IsObject, IsOptional, IsString, MaxLength } from "class-validator";
import { StringLiteral } from "typescript";
import {Location} from "../entities/location.entity"
import { Region } from "../../regions/entities/region.entity";

export class CreateLocationDto extends Location {
    
    @IsString()
    @MaxLength(35)
    locationName: string;
    @IsString()
    @MaxLength(120)
    locationAddress: string;
    @IsArray()
    @ArrayNotEmpty()
    locationLatLng: number[];
    @IsObject()
    @IsOptional()
    region: Region;
}

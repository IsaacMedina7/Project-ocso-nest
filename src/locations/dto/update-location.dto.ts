import { PartialType } from '@nestjs/mapped-types';
import { CreateLocationDto } from '../dto/create-location.dto';

export class UpdateLocationDto extends PartialType(CreateLocationDto) {}

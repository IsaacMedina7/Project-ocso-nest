import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Repository } from 'typeorm';
import { Location } from "./entities/location.entity"
import { InjectRepository } from '@nestjs/typeorm';
import { Manager } from '../managers/entities/manager.entity';
import { privateDecrypt } from 'crypto';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
    @InjectRepository(Manager)
    private managerRepository: Repository<Manager>
  ) { }
 async create(createLocationDto: CreateLocationDto) {
  // 1. Guardar la ubicación en la tabla location (guarda managerId ahí)
  const location = await this.locationRepository.save(createLocationDto);

  // 2. Si viene un manager seleccionado, actualizar la tabla manager con el locationId
  if (createLocationDto.manager) {
    const manager = await this.managerRepository.preload({
      managerId: createLocationDto.manager,
      location: location,
    });

    if (manager) {
      await this.managerRepository.save(manager);
    }
  }

  return location;
}

  findAll() {
    return this.locationRepository.find()
  }

  async findOne(id: number) {
    const location = await this.locationRepository.findOneBy({
      locationId: id,
    })
    if (!location) throw new NotFoundException("Location Not Found")
    return location;
  }

  async update(id: number, updateLocationDto: UpdateLocationDto) {

  // 1. Agregado await para esperar la desasignación previa del manager en PostgreSQL
  await this.managerRepository
    .createQueryBuilder()
    .update()
    .set({ location: null })
    .where("locationId = :id", { id })
    .execute();

  const location = await this.locationRepository.preload({
    locationId: id,
    ...updateLocationDto,
  });

  if (!location) throw new NotFoundException("Location Not Found");

  // 2. Agregado await para guardar la entidad resuelta
  const savedLocation = await this.locationRepository.save(location);

  const updatedManager = await this.managerRepository.preload({
    managerId: updateLocationDto.manager,
    location: location,
  });

  if (updatedManager) {
    await this.managerRepository.save(updatedManager);
  }

  return savedLocation;
}

  remove(id: number) {
    return this.locationRepository.delete({
      locationId: id,
    });
  }
}

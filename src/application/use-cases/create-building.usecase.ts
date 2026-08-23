import { Injectable, Inject } from '@nestjs/common';
import { BUILDING_REPOSITORY } from '../../domain/ports/building.repository.interface';
import type { IBuildingRepository } from '../../domain/ports/building.repository.interface';
import { Building } from '../../domain/entities/Building';
import { CreateBuildingDto } from '../../infrastructure/dto/create-building.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class CreateBuildingUseCase {
    constructor(
        @Inject(BUILDING_REPOSITORY)
        private readonly buildingRepository: IBuildingRepository,
    ) { }

    async execute(dto: CreateBuildingDto): Promise<Building> {
        const newBuilding = new Building(randomUUID(), dto.name, dto.address, dto.floorCount);
        return await this.buildingRepository.save(newBuilding);
    }
}

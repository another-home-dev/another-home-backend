import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IBuildingRepository } from '../../../domain/ports/building.repository.interface';
import { Building } from '../../../domain/entities/Building';
import { BuildingOrmEntity } from '../entities/building.orm-entity';
import { BuildingMapper } from '../mappers/building.mapper';

@Injectable()
export class BuildingRepository implements IBuildingRepository {
    constructor(
        @InjectRepository(BuildingOrmEntity)
        private readonly typeOrmRepository: Repository<BuildingOrmEntity>,
    ) { }

    async save(building: Building): Promise<Building> {
        const ormEntity = BuildingMapper.toPersistence(building);
        const savedEntity = await this.typeOrmRepository.save(ormEntity);
        return BuildingMapper.toDomain(savedEntity);
    }

    async findById(id: string): Promise<Building | null> {
        const ormEntity = await this.typeOrmRepository.findOne({ where: { id } });
        if (!ormEntity) return null;
        return BuildingMapper.toDomain(ormEntity);
    }

    async findAll(): Promise<Building[]> {
        const ormEntities = await this.typeOrmRepository.find();
        return ormEntities.map((entity) => BuildingMapper.toDomain(entity));
    }
}

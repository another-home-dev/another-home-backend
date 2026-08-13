import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IBedRepository } from '../../../domain/ports/bed.repository.interface';
import { Bed } from '../../../domain/entities/Bed';
import { BedOrmEntity } from '../entities/bed.orm-entity';
import { BedMapper } from '../mappers/bed.mapper';

@Injectable()
export class BedRepository implements IBedRepository {
    constructor(
        @InjectRepository(BedOrmEntity)
        private readonly typeOrmRepository: Repository<BedOrmEntity>,
    ) { }

    async save(bed: Bed): Promise<Bed> {
        const ormEntity = BedMapper.toPersistence(bed);
        const savedEntity = await this.typeOrmRepository.save(ormEntity);
        return BedMapper.toDomain(savedEntity);
    }

    async findById(id: string): Promise<Bed | null> {
        const ormEntity = await this.typeOrmRepository.findOne({ where: { bedId: id } });
        if (!ormEntity) return null;
        return BedMapper.toDomain(ormEntity);
    }

    async findOccupiedBeds(): Promise<Bed[]> {
        const ormEntities = await this.typeOrmRepository.find({ where: { isOccupied: true } });
        return ormEntities.map(entity => BedMapper.toDomain(entity));
    }
}

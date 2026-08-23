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
        
        // If the bed is being occupied, perform an atomic update check
        if (bed.isOccupied) {
            // First check if the student is already assigned somewhere else
            if (bed.studentId) {
                const alreadyAssigned = await this.typeOrmRepository.findOne({
                    where: { studentId: bed.studentId }
                });
                if (alreadyAssigned && alreadyAssigned.bedId !== bed.id) {
                    throw new Error(`Student ${bed.studentId} is already assigned to bed ${alreadyAssigned.bedId}.`);
                }
            }

            const result = await this.typeOrmRepository.update(
                { bedId: bed.id, isOccupied: false },
                ormEntity
            );
            if (result.affected === 0) {
                throw new Error('This bed is already occupied.');
            }
            return bed;
        }

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

    async findByRoomId(roomId: string): Promise<Bed[]> {
        const ormEntities = await this.typeOrmRepository.find({ where: { roomId } });
        return ormEntities.map(entity => BedMapper.toDomain(entity));
    }
}

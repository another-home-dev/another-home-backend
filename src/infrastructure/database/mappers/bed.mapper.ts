import { Bed } from '../../../domain/entities/Bed';
import { BedOrmEntity } from '../entities/bed.orm-entity';

export class BedMapper {
    static toDomain(raw: BedOrmEntity): Bed {
        return new Bed(
            raw.bedId,
            raw.roomId,
            raw.isOccupied,
            raw.studentId,
            raw.bedNumber
        );
    }

    static toPersistence(domainBed: Bed): BedOrmEntity {
        const ormEntity = new BedOrmEntity();
        ormEntity.bedId = domainBed.id;
        ormEntity.roomId = domainBed.roomId;
        ormEntity.isOccupied = domainBed.isOccupied;
        ormEntity.studentId = domainBed.studentId;
        ormEntity.bedNumber = domainBed.bedNumber || '';
        return ormEntity;
    }
}

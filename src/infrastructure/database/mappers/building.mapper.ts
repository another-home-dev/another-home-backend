import { Building } from '../../../domain/entities/Building';
import { BuildingOrmEntity } from '../entities/building.orm-entity';

export class BuildingMapper {
    static toDomain(raw: BuildingOrmEntity): Building {
        return new Building(raw.id, raw.name, raw.address, raw.floorCount);
    }

    static toPersistence(domainBuilding: Building): BuildingOrmEntity {
        const ormEntity = new BuildingOrmEntity();
        ormEntity.id = domainBuilding.id;
        ormEntity.name = domainBuilding.name;
        ormEntity.address = domainBuilding.address;
        ormEntity.floorCount = domainBuilding.floorCount;
        return ormEntity;
    }
}

import { Room } from '../../../domain/entities/Room';
import { RoomOrmEntity } from '../entities/room.orm-entity';

export class RoomMapper {

    // Translates Database Data -> Pure Domain Object
    static toDomain(raw: RoomOrmEntity): Room {
        // We skip createdAt, updatedAt, and deletedAt because the domain doesn't care about them
        return new Room(
            raw.roomId,
            raw.roomNumber,
            raw.capacity,
            raw.gender,
            raw.isAvailable,
            raw.airConditioning,
            raw.rentPerMonth,
            raw.floor,
            raw.buildingId
        );
    }

    // Translates Pure Domain Object -> Database Format
    static toPersistence(domainRoom: Room): RoomOrmEntity {
        const ormEntity = new RoomOrmEntity();

        ormEntity.roomId = domainRoom.roomId;
        ormEntity.roomNumber = domainRoom.roomNumber;
        ormEntity.capacity = domainRoom.capacity;
        ormEntity.gender = domainRoom.gender;
        ormEntity.isAvailable = domainRoom.isAvailable;
        ormEntity.airConditioning = domainRoom.airConditioning;
        ormEntity.rentPerMonth = domainRoom.rentPerMonth;
        ormEntity.floor = domainRoom.floor;
        ormEntity.buildingId = domainRoom.buildingId;

        // TypeORM will automatically generate the createdAt/updatedAt timestamps 
        // when this object is handed to the save() function.

        return ormEntity;
    }
}
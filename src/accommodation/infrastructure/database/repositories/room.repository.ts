import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IRoomRepository } from '../../../domain/ports/room.repository.interface';
import { Room } from '../../../domain/entities/Room.entity';
import { RoomOrmEntity } from '../entities/room.orm-entity';
import { RoomMapper } from '../mappers/room.mapper';

@Injectable()
export class RoomRepository implements IRoomRepository {
    constructor(
        // We inject the actual TypeORM repository for the ORM Entity
        @InjectRepository(RoomOrmEntity)
        private readonly typeOrmRepository: Repository<RoomOrmEntity>,
    ) { }

    async save(room: Room): Promise<Room> {
        // 1. Convert pure Domain Room to Database Entity
        const ormEntity = RoomMapper.toPersistence(room);

        // 2. Save it using TypeORM
        const savedEntity = await this.typeOrmRepository.save(ormEntity);

        // 3. Convert it back to a pure Domain Room to return
        return RoomMapper.toDomain(savedEntity);
    }

    async findById(id: string): Promise<Room | null> {
        const ormEntity = await this.typeOrmRepository.findOne({ where: { roomId: id } });
        if (!ormEntity) return null;

        return RoomMapper.toDomain(ormEntity);
    }

    async findByRoomNumber(roomNumber: string): Promise<Room | null> {
        const ormEntity = await this.typeOrmRepository.findOne({ where: { roomNumber } });
        if (!ormEntity) return null;

        return RoomMapper.toDomain(ormEntity);
    }
}
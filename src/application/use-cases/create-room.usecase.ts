import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { ROOM_REPOSITORY } from '../../domain/ports/room.repository.interface';
import type { IRoomRepository } from '../../domain/ports/room.repository.interface';
import { BED_REPOSITORY } from '../../domain/ports/bed.repository.interface';
import type { IBedRepository } from '../../domain/ports/bed.repository.interface';
import { Room } from '../../domain/entities/Room';
import { Bed } from '../../domain/entities/Bed';
import { CreateRoomDto } from '../../infrastructure/dto/create-room.dto';
import { randomUUID } from 'crypto'; // Built into Node.js

@Injectable()
export class CreateRoomUseCase {
    constructor(
        // We use the Symbol nametag we created earlier to ask NestJS for the database worker
        @Inject(ROOM_REPOSITORY)
        private readonly roomRepository: IRoomRepository,
        @Inject(BED_REPOSITORY)
        private readonly bedRepository: IBedRepository,
    ) { }

    async execute(dto: CreateRoomDto): Promise<Room> {
        // 1. Enforce Business Rule: No duplicate room numbers allowed
        const existingRoom = await this.roomRepository.findByRoomNumber(dto.roomNumber);
        if (existingRoom) {
            throw new ConflictException(`A room with the number ${dto.roomNumber} already exists in the system.`);
        }

        // 2. Create the Pure Domain Entity
        // We inject the DTO data into our pure TypeScript class
        const newRoom = new Room(
            randomUUID(),        // Generate a secure ID here in the application layer
            dto.roomNumber,
            dto.capacity,
            dto.gender,
            true,                // isAvailable defaults to true when a room is first created
            dto.airConditioning,
            dto.rentPerMonth,
            dto.floor,
            dto.buildingId ?? null
        );

        // 3. Save the data
        // The Use Case hands the pure Room to the interface contract.
        // It has NO IDEA that TypeORM or MySQL is doing the heavy lifting behind the scenes!
        const savedRoom = await this.roomRepository.save(newRoom);

        // 4. Auto-create one bed per unit of capacity, so the room is immediately
        // assignable (there's no separate bed-management UI on the frontend).
        for (let i = 1; i <= savedRoom.capacity; i += 1) {
            await this.bedRepository.save(
                new Bed(randomUUID(), savedRoom.roomId, false, null, `${savedRoom.roomNumber}-B${i}`),
            );
        }

        return savedRoom;
    }
}
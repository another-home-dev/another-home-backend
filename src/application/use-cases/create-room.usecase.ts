import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { ROOM_REPOSITORY } from '../../domain/ports/room.repository.interface';
import type { IRoomRepository } from '../../domain/ports/room.repository.interface';
import { Room } from '../../domain/entities/Room';
import { CreateRoomDto } from '../../infrastructure/dto/create-room.dto';
import { randomUUID } from 'crypto'; // Built into Node.js

@Injectable()
export class CreateRoomUseCase {
    constructor(
        // We use the Symbol nametag we created earlier to ask NestJS for the database worker
        @Inject(ROOM_REPOSITORY)
        private readonly roomRepository: IRoomRepository,
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
            dto.floor
        );

        // 3. Save the data
        // The Use Case hands the pure Room to the interface contract. 
        // It has NO IDEA that TypeORM or MySQL is doing the heavy lifting behind the scenes!
        return await this.roomRepository.save(newRoom);
    }
}
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ROOM_REPOSITORY } from '../../domain/ports/room.repository.interface';
import type { IRoomRepository } from '../../domain/ports/room.repository.interface';
import { Room } from '../../domain/entities/Room';
import { UpdateRoomDto } from '../../infrastructure/dto/update-room.dto';

@Injectable()
export class UpdateRoomUseCase {
    constructor(
        @Inject(ROOM_REPOSITORY)
        private readonly roomRepository: IRoomRepository,
    ) { }

    async execute(roomId: string, dto: UpdateRoomDto): Promise<Room> {
        const room = await this.roomRepository.findById(roomId);
        if (!room) {
            throw new NotFoundException(`Room with ID ${roomId} not found.`);
        }

        if (dto.roomNumber !== undefined) room.roomNumber = dto.roomNumber;
        if (dto.capacity !== undefined) room.capacity = dto.capacity;
        if (dto.gender !== undefined) room.gender = dto.gender;
        if (dto.airConditioning !== undefined) room.airConditioning = dto.airConditioning;
        if (dto.rentPerMonth !== undefined) room.rentPerMonth = dto.rentPerMonth;
        if (dto.floor !== undefined) room.floor = dto.floor;
        if (dto.buildingId !== undefined) room.buildingId = dto.buildingId;

        return await this.roomRepository.save(room);
    }
}

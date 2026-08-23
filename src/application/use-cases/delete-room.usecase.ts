import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ROOM_REPOSITORY } from '../../domain/ports/room.repository.interface';
import type { IRoomRepository } from '../../domain/ports/room.repository.interface';

@Injectable()
export class DeleteRoomUseCase {
    constructor(
        @Inject(ROOM_REPOSITORY)
        private readonly roomRepository: IRoomRepository,
    ) { }

    async execute(roomId: string): Promise<void> {
        const room = await this.roomRepository.findById(roomId);
        if (!room) {
            throw new NotFoundException(`Room with ID ${roomId} not found.`);
        }
        await this.roomRepository.delete(roomId);
    }
}

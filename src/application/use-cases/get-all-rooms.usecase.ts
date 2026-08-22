import { Injectable, Inject } from '@nestjs/common';
import { ROOM_REPOSITORY } from '../../domain/ports/room.repository.interface';
import type { IRoomRepository } from '../../domain/ports/room.repository.interface';
import { Room } from '../../domain/entities/Room';

@Injectable()
export class GetAllRoomsUseCase {
    constructor(
        @Inject(ROOM_REPOSITORY)
        private readonly roomRepository: IRoomRepository,
    ) { }

    async execute(): Promise<Room[]> {
        return await this.roomRepository.findAll();
    }
}
import { Injectable, Inject, BadRequestException, NotFoundException } from '@nestjs/common';
import { ROOM_REPOSITORY } from '../../domain/ports/room.repository.interface';
import type { IRoomRepository } from '../../domain/ports/room.repository.interface';
import { BED_REPOSITORY } from '../../domain/ports/bed.repository.interface';
import type { IBedRepository } from '../../domain/ports/bed.repository.interface';
import { Bed } from '../../domain/entities/Bed';

@Injectable()
export class AssignStudentToRoomUseCase {
    constructor(
        @Inject(ROOM_REPOSITORY)
        private readonly roomRepository: IRoomRepository,
        @Inject(BED_REPOSITORY)
        private readonly bedRepository: IBedRepository,
    ) { }

    async execute(roomId: string, studentId: string): Promise<Bed> {
        const room = await this.roomRepository.findById(roomId);
        if (!room) {
            throw new NotFoundException(`Room with ID ${roomId} not found.`);
        }

        const bedsInRoom = await this.bedRepository.findByRoomId(roomId);
        const freeBed = bedsInRoom.find((bed) => !bed.isOccupied);
        if (!freeBed) {
            throw new BadRequestException('This room has no available beds.');
        }

        freeBed.allocateStudent(studentId);
        return await this.bedRepository.save(freeBed);
    }
}

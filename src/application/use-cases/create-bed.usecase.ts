import { Injectable, Inject, ConflictException, NotFoundException } from '@nestjs/common';
import { BED_REPOSITORY } from '../../domain/ports/bed.repository.interface';
import type { IBedRepository } from '../../domain/ports/bed.repository.interface';
import { ROOM_REPOSITORY } from '../../domain/ports/room.repository.interface';
import type { IRoomRepository } from '../../domain/ports/room.repository.interface';
import { Bed } from '../../domain/entities/Bed';
import { CreateBedDto } from '../../infrastructure/dto/create-bed.dto';

@Injectable()
export class CreateBedUseCase {
    constructor(
        @Inject(BED_REPOSITORY)
        private readonly bedRepository: IBedRepository,
        @Inject(ROOM_REPOSITORY)
        private readonly roomRepository: IRoomRepository,
    ) { }

    async execute(dto: CreateBedDto): Promise<Bed> {
        const room = await this.roomRepository.findById(dto.roomId);
        if (!room) {
            throw new NotFoundException(`Room with ID ${dto.roomId} not found.`);
        }

        const existingBed = await this.bedRepository.findById(dto.bedId);
        if (existingBed) {
            throw new ConflictException(`A bed with ID ${dto.bedId} already exists.`);
        }

        const newBed = new Bed(
            dto.bedId,
            dto.roomId,
            false,
            null,
            dto.bedNumber
        );

        return await this.bedRepository.save(newBed);
    }
}

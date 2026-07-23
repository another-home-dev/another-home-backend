import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { BED_REPOSITORY } from '../../domain/ports/bed.repository.interface';
import type { IBedRepository } from '../../domain/ports/bed.repository.interface';
import { AllocateBedDto } from '../dto/allocate-bed.dto';

@Injectable()
export class AllocateBedUseCase {
    constructor(
        // Injecting the Bed Repository interface, just like we did with Rooms
        @Inject(BED_REPOSITORY)
        private readonly bedRepository: IBedRepository,
    ) { }

    async execute(dto: AllocateBedDto) {
        // 1. Fetch the exact bed from the database
        const bed = await this.bedRepository.findById(dto.bedId);

        if (!bed) {
            throw new BadRequestException(`Bed with ID ${dto.bedId} not found.`);
        }

        // 2. Domain logic validation: Prevent double-booking
        if (bed.isOccupied) {
            throw new BadRequestException('Allocation failed: This bed is already occupied.');
        }

        // 3. Allocate the student (Using the pure Domain Entity method)
        bed.allocateStudent(dto.studentId);

        // 4. Save the updated bed state back to MySQL
        const updatedBed = await this.bedRepository.save(bed);

        return updatedBed;
    }
}
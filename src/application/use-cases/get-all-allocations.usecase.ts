import { Injectable, Inject } from '@nestjs/common';
import { BED_REPOSITORY } from '../../domain/ports/bed.repository.interface';
import type { IBedRepository } from '../../domain/ports/bed.repository.interface';

@Injectable()
export class GetAllAllocationsUseCase {
    constructor(
        @Inject(BED_REPOSITORY)
        private readonly bedRepository: IBedRepository,
    ) { }

    async execute() {
        // We will define findOccupiedBeds in the repository interface next
        return await this.bedRepository.findOccupiedBeds();
    }
}
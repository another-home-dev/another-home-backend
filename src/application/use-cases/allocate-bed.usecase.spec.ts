import { AllocateBedUseCase } from './allocate-bed.usecase';
import { IBedRepository } from '../../domain/ports/bed.repository.interface';
import { Bed } from '../../domain/entities/Bed';
import { BadRequestException, ConflictException } from '@nestjs/common';

describe('AllocateBedUseCase', () => {
    let useCase: AllocateBedUseCase;
    let mockBedRepository: jest.Mocked<IBedRepository>;

    beforeEach(() => {
        mockBedRepository = {
            findById: jest.fn(),
            save: jest.fn(),
            findOccupiedBeds: jest.fn(),
        } as unknown as jest.Mocked<IBedRepository>;

        useCase = new AllocateBedUseCase(mockBedRepository);
    });

    it('should throw BadRequestException if bed is not found', async () => {
        mockBedRepository.findById.mockResolvedValue(null);

        await expect(useCase.execute({ bedId: 'nonexistent', studentId: 'stu-1' }))
            .rejects
            .toThrow(BadRequestException);
    });

    it('should throw BadRequestException if bed is already occupied', async () => {
        const bed = new Bed('bed-1', 'room-1', true, 'stu-existing', 'B1');
        mockBedRepository.findById.mockResolvedValue(bed);

        await expect(useCase.execute({ bedId: 'bed-1', studentId: 'stu-1' }))
            .rejects
            .toThrow(BadRequestException);
    });

    it('should successfully allocate student if bed is free', async () => {
        const bed = new Bed('bed-1', 'room-1', false, null, 'B1');
        mockBedRepository.findById.mockResolvedValue(bed);
        mockBedRepository.save.mockResolvedValue(new Bed('bed-1', 'room-1', true, 'stu-1', 'B1'));

        const result = await useCase.execute({ bedId: 'bed-1', studentId: 'stu-1' });
        expect(result.isOccupied).toBe(true);
        expect(result.studentId).toBe('stu-1');
        expect(mockBedRepository.save).toHaveBeenCalled();
    });

    it('should throw ConflictException if database layer throws an error (atomic check fails)', async () => {
        const bed = new Bed('bed-1', 'room-1', false, null, 'B1');
        mockBedRepository.findById.mockResolvedValue(bed);
        mockBedRepository.save.mockRejectedValue(new Error('This bed is already occupied.'));

        await expect(useCase.execute({ bedId: 'bed-1', studentId: 'stu-1' }))
            .rejects
            .toThrow(ConflictException);
    });
});

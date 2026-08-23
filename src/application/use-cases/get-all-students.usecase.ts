import { Injectable, Inject } from '@nestjs/common';
import { STUDENT_REPOSITORY } from '../../domain/ports/student.repository.interface';
import type { IStudentRepository } from '../../domain/ports/student.repository.interface';
import { BED_REPOSITORY } from '../../domain/ports/bed.repository.interface';
import type { IBedRepository } from '../../domain/ports/bed.repository.interface';
import { ROOM_REPOSITORY } from '../../domain/ports/room.repository.interface';
import type { IRoomRepository } from '../../domain/ports/room.repository.interface';
import { BUILDING_REPOSITORY } from '../../domain/ports/building.repository.interface';
import type { IBuildingRepository } from '../../domain/ports/building.repository.interface';

@Injectable()
export class GetAllStudentsUseCase {
    constructor(
        @Inject(STUDENT_REPOSITORY)
        private readonly studentRepository: IStudentRepository,
        @Inject(BED_REPOSITORY)
        private readonly bedRepository: IBedRepository,
        @Inject(ROOM_REPOSITORY)
        private readonly roomRepository: IRoomRepository,
        @Inject(BUILDING_REPOSITORY)
        private readonly buildingRepository: IBuildingRepository,
    ) { }

    async execute() {
        const [students, occupiedBeds, rooms, buildings] = await Promise.all([
            this.studentRepository.findAll(),
            this.bedRepository.findOccupiedBeds(),
            this.roomRepository.findAll(),
            this.buildingRepository.findAll(),
        ]);

        return students.map((student) => {
            const bed = occupiedBeds.find((b) => b.studentId === student.id);
            const room = bed ? rooms.find((r) => r.roomId === bed.roomId) : undefined;
            const building = room?.buildingId ? buildings.find((b) => b.id === room.buildingId) : undefined;

            return {
                ...student,
                roomNumber: room?.roomNumber ?? null,
                buildingName: building?.name ?? null,
            };
        });
    }
}

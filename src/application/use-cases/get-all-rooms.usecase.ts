import { Injectable, Inject } from '@nestjs/common';
import { ROOM_REPOSITORY } from '../../domain/ports/room.repository.interface';
import type { IRoomRepository } from '../../domain/ports/room.repository.interface';
import { BED_REPOSITORY } from '../../domain/ports/bed.repository.interface';
import type { IBedRepository } from '../../domain/ports/bed.repository.interface';
import { STUDENT_REPOSITORY } from '../../domain/ports/student.repository.interface';
import type { IStudentRepository } from '../../domain/ports/student.repository.interface';

@Injectable()
export class GetAllRoomsUseCase {
    constructor(
        @Inject(ROOM_REPOSITORY)
        private readonly roomRepository: IRoomRepository,
        @Inject(BED_REPOSITORY)
        private readonly bedRepository: IBedRepository,
        @Inject(STUDENT_REPOSITORY)
        private readonly studentRepository: IStudentRepository,
    ) { }

    async execute() {
        const [rooms, occupiedBeds, students] = await Promise.all([
            this.roomRepository.findAll(),
            this.bedRepository.findOccupiedBeds(),
            this.studentRepository.findAll(),
        ]);

        return rooms.map((room) => {
            const bedsInRoom = occupiedBeds.filter((bed) => bed.roomId === room.roomId);
            const assignedStudents = bedsInRoom.map((bed) => {
                const student = students.find((s) => s.id === bed.studentId);
                return { id: bed.studentId, name: student?.name ?? 'Unknown' };
            });

            return {
                ...room,
                occupiedBeds: bedsInRoom.length,
                assignedStudents,
            };
        });
    }
}
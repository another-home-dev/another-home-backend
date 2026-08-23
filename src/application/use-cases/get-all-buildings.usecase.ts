import { Injectable, Inject } from '@nestjs/common';
import { BUILDING_REPOSITORY } from '../../domain/ports/building.repository.interface';
import type { IBuildingRepository } from '../../domain/ports/building.repository.interface';
import { ROOM_REPOSITORY } from '../../domain/ports/room.repository.interface';
import type { IRoomRepository } from '../../domain/ports/room.repository.interface';
import { BED_REPOSITORY } from '../../domain/ports/bed.repository.interface';
import type { IBedRepository } from '../../domain/ports/bed.repository.interface';

@Injectable()
export class GetAllBuildingsUseCase {
    constructor(
        @Inject(BUILDING_REPOSITORY)
        private readonly buildingRepository: IBuildingRepository,
        @Inject(ROOM_REPOSITORY)
        private readonly roomRepository: IRoomRepository,
        @Inject(BED_REPOSITORY)
        private readonly bedRepository: IBedRepository,
    ) { }

    async execute() {
        const [buildings, rooms, occupiedBeds] = await Promise.all([
            this.buildingRepository.findAll(),
            this.roomRepository.findAll(),
            this.bedRepository.findOccupiedBeds(),
        ]);

        return buildings.map((building) => {
            const buildingRooms = rooms.filter((room) => room.buildingId === building.id);
            const totalCapacity = buildingRooms.reduce((sum, room) => sum + room.capacity, 0);
            const occupiedCount = occupiedBeds.filter((bed) =>
                buildingRooms.some((room) => room.roomId === bed.roomId),
            ).length;

            return {
                ...building,
                totalCapacity,
                occupiedCount,
            };
        });
    }
}

import { Module } from '@nestjs/common';
import { AccommodationController } from './infrastructure/controllers/accommodation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateRoomUseCase } from './application/use-cases/create-room.usecase';
import { ROOM_REPOSITORY } from './domain/ports/room.repository.interface';
import { RoomRepository } from './infrastructure/database/repositories/room.repository';
import { RoomOrmEntity } from './infrastructure/database/entities/room.orm-entity';
import { GetAllRoomsUseCase } from './application/use-cases/get-all-rooms.usecase';
import { BedOrmEntity } from './infrastructure/database/entities/bed.orm-entity';
import { AllocateBedUseCase } from './application/use-cases/allocate-bed.usecase';
import { GetAllAllocationsUseCase } from './application/use-cases/get-all-allocations.usecase';
import { BED_REPOSITORY } from './domain/ports/bed.repository.interface';
import { BedRepository } from './infrastructure/database/repositories/bed.repository';
import { CreateBedUseCase } from './application/use-cases/create-bed.usecase';

@Module({
    // 1. Crucial: This tells NestJS and TypeORM to generate/manage the tables for this module
    imports: [TypeOrmModule.forFeature([RoomOrmEntity, BedOrmEntity])],

    // 2. Registers your web API controller
    controllers: [AccommodationController],

    // 3. Registers your use-cases and binds the Interfaces to the MySQL Repositories
    providers: [
        CreateRoomUseCase,
        GetAllRoomsUseCase,
        AllocateBedUseCase,
        GetAllAllocationsUseCase,
        CreateBedUseCase,
        {
            provide: ROOM_REPOSITORY,
            useClass: RoomRepository
        },
        {
            provide: BED_REPOSITORY,
            useClass: BedRepository
        },
    ],
})
export class AccommodationModule { }
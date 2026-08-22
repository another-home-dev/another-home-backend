import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { CreateRoomDto } from '../dto/create-room.dto';
import { AllocateBedDto } from '../dto/allocate-bed.dto';
import { CreateBedDto } from '../dto/create-bed.dto';
import { CreateRoomUseCase } from '../../application/use-cases/create-room.usecase';
import { GetAllRoomsUseCase } from '../../application/use-cases/get-all-rooms.usecase';
import { AllocateBedUseCase } from '../../application/use-cases/allocate-bed.usecase';
import { GetAllAllocationsUseCase } from '../../application/use-cases/get-all-allocations.usecase';
import { CreateBedUseCase } from '../../application/use-cases/create-bed.usecase';
import { RolesGuard, Roles } from '../guards/roles.guard';

@ApiTags('Accommodation')
@ApiBearerAuth()
@UseGuards(RolesGuard)
@Controller('accommodation')
export class AccommodationController {

    constructor(
        private readonly createRoomUseCase: CreateRoomUseCase,
        private readonly getAllRoomsUseCase: GetAllRoomsUseCase,
        private readonly allocateBedUseCase: AllocateBedUseCase,
        private readonly getAllAllocationsUseCase: GetAllAllocationsUseCase,
        private readonly createBedUseCase: CreateBedUseCase,
    ) { }

    @Post('rooms')
    @Roles('staff')
    @ApiOperation({ summary: 'Create a new hostel room' })
    @ApiResponse({ status: 201, description: 'Room created successfully.' })
    async createRoom(@Body() createRoomDto: CreateRoomDto) {
        const room = await this.createRoomUseCase.execute(createRoomDto);
        return {
            message: 'Room created successfully.',
            data: room,
        };
    }

    @Get('rooms')
    @ApiOperation({ summary: 'Get all rooms and their current capacity' })
    @ApiResponse({ status: 200, description: 'Returns an array of all rooms.' })
    async getAllRooms() {
        const rooms = await this.getAllRoomsUseCase.execute();
        return {
            message: 'Returning all rooms from database successfully.',
            data: rooms
        };
    }

    @Post('beds')
    @Roles('staff')
    @ApiOperation({ summary: 'Create a new bed in a room' })
    @ApiResponse({ status: 201, description: 'Bed created successfully.' })
    async createBed(@Body() createBedDto: CreateBedDto) {
        const bed = await this.createBedUseCase.execute(createBedDto);
        return {
            message: 'Bed created successfully.',
            data: bed,
        };
    }

    @Post('allocations')
    @Roles('staff')
    @ApiOperation({ summary: 'Assign a student to a specific bed' })
    @ApiResponse({ status: 201, description: 'Student successfully allocated.' })
    @ApiResponse({ status: 400, description: 'Bed already occupied or not found.' })
    async allocateStudent(@Body() allocateBedDto: AllocateBedDto) {
        const allocation = await this.allocateBedUseCase.execute(allocateBedDto);
        return {
            message: 'Student allocated to bed successfully.',
            data: allocation,
        };
    }

    @Get('allocations')
    @ApiOperation({ summary: 'Get a list of all current bed allocations' })
    @ApiResponse({ status: 200, description: 'Returns all occupied beds.' })
    async getAllAllocations() {
        const allocations = await this.getAllAllocationsUseCase.execute();
        return {
            message: 'Successfully retrieved all allocations.',
            data: allocations
        };
    }
}
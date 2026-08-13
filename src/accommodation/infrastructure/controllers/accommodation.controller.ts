import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { CreateRoomDto } from '../dto/create-room.dto';
import { AllocateBedDto } from '../dto/allocate-bed.dto';
import { CreateRoomUseCase } from '../../application/use-cases/create-room.usecase';
import { GetAllRoomsUseCase } from '../../application/use-cases/get-all-rooms.usecase';
import { AllocateBedUseCase } from '../../application/use-cases/allocate-bed.usecase';
import { GetAllAllocationsUseCase } from '../../application/use-cases/get-all-allocations.usecase';
import { JwtAuthGuard } from '../../../auth/infrastructure/guards/jwt-auth.guard';

@ApiTags('Accommodation')
@ApiBearerAuth()
@Controller('accommodation')
export class AccommodationController {

    // Inject the Use Case into the Controller
    constructor(
        private readonly createRoomUseCase: CreateRoomUseCase,
        private readonly getAllRoomsUseCase: GetAllRoomsUseCase,
        private readonly allocateBedUseCase: AllocateBedUseCase,
        private readonly getAllAllocationsUseCase: GetAllAllocationsUseCase,
    ) { }

    @Post('rooms')
    @ApiOperation({ summary: 'Create a new hostel room' })
    @ApiResponse({ status: 201, description: 'Room created successfully.' })
    async createRoom(@Body() createRoomDto: CreateRoomDto) {

        // Hand the DTO directly to the Use Case and wait for the result
        const room = await this.createRoomUseCase.execute(createRoomDto);

        return {
            message: 'Room created successfully.',
            data: room,
        };
    }

    @UseGuards(JwtAuthGuard)
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

    @Post('allocations')
    @ApiOperation({ summary: 'Assign a student to a specific bed' })
    @ApiResponse({ status: 201, description: 'Student successfully allocated.' })
    @ApiResponse({ status: 400, description: 'Bed already occupied or not found.' })
    async allocateStudent(@Body() allocateBedDto: AllocateBedDto) {

        const allocation = await this.allocateBedUseCase.execute(allocateBedDto);
        return {
            message: 'Mock response: Student allocated to bed.',
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
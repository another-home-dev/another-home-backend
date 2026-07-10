import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreateRoomDto } from '../dto/create-room.dto';
import { AllocateBedDto } from '../dto/allocate-bed.dto';

@ApiTags('Accommodation')
@Controller('accommodation')
export class AccommodationController {

    @Post('rooms')
    @ApiOperation({ summary: 'Create a new hostel room' })
    @ApiResponse({ status: 201, description: 'Room created successfully.' })
    createRoom(@Body() createRoomDto: CreateRoomDto) {
        return {
            message: 'Mock response: Room created successfully.',
            data: createRoomDto,
        };
    }

    @Get('rooms')
    @ApiOperation({ summary: 'Get all rooms and their current capacity' })
    @ApiResponse({ status: 200, description: 'Returns an array of all rooms.' })
    getAllRooms() {
        return {
            message: 'Mock response: Returning list of rooms.',
            data: []
        };
    }

    @Post('allocations')
    @ApiOperation({ summary: 'Assign a student to a specific bed' })
    @ApiResponse({ status: 201, description: 'Student successfully allocated.' })
    allocateStudent(@Body() allocateBedDto: AllocateBedDto) {
        return {
            message: 'Mock response: Student allocated to bed.',
            data: allocateBedDto,
        };
    }
}
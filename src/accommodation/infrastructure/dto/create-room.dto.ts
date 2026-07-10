import { ApiProperty } from '@nestjs/swagger';

export class CreateRoomDto {
    @ApiProperty({
        example: 'A-101',
        description: 'The unique identifier for the room (e.g., Block-Number)'
    })
    roomNumber: string;

    @ApiProperty({
        example: 4,
        description: 'Maximum number of beds in this room'
    })
    capacity: number;

    @ApiProperty({
        example: 'Male',
        description: 'The designated gender for this specific room or block',
        enum: ['Male', 'Female', 'Neutral']
    })
    designation: string;
}
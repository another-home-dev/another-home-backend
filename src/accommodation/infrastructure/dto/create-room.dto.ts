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
        enum: ['Male', 'Female']
    })
    gender: 'Male' | 'Female';

    @ApiProperty({
        example: 'Non-AC',
        description: 'Whether the room has air conditioning',
        enum: ['AC', 'Non-AC']
    })
    airConditioning: 'AC' | 'Non-AC';

    @ApiProperty({
        example: 5000,
        description: 'Monthly rent for the room in local currency'
    })
    rentPerMonth: number;

    @ApiProperty({
        example: 1,
        description: 'Floor number where the room is located'
    })
    floor: number;
}
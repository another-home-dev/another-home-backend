import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsPositive, IsIn, IsOptional } from 'class-validator';

export class CreateRoomDto {
    @ApiProperty({
        example: 'A-101',
        description: 'The unique identifier for the room (e.g., Block-Number)'
    })
    @IsString()
    @IsNotEmpty()
    roomNumber: string;

    @ApiProperty({
        example: 4,
        description: 'Maximum number of beds in this room'
    })
    @IsNumber()
    @IsPositive()
    capacity: number;

    @ApiProperty({
        example: 'Male',
        description: 'The designated gender for this specific room or block',
        enum: ['Male', 'Female', 'Neutral']
    })
    @IsIn(['Male', 'Female', 'Neutral'])
    gender: 'Male' | 'Female' | 'Neutral';

    @ApiProperty({
        example: 'Non-AC',
        description: 'Whether the room has air conditioning',
        enum: ['AC', 'Non-AC']
    })
    @IsIn(['AC', 'Non-AC'])
    airConditioning: 'AC' | 'Non-AC';

    @ApiProperty({
        example: 5000,
        description: 'Monthly rent for the room in local currency'
    })
    @IsNumber()
    @IsPositive()
    rentPerMonth: number;

    @ApiProperty({
        example: 1,
        description: 'Floor number where the room is located'
    })
    @IsNumber()
    floor: number;

    @ApiProperty({
        required: false,
        description: 'The ID of the building this room belongs to'
    })
    @IsOptional()
    @IsString()
    buildingId?: string;
}

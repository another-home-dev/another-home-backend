import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class AllocateBedDto {
    @ApiProperty({ description: 'The unique ID of the bed' })
    @IsString()
    @IsNotEmpty()
    bedId: string;

    @ApiProperty({ description: 'The ID of the student being assigned to the bed' })
    @IsString()
    @IsNotEmpty()
    studentId: string;
}
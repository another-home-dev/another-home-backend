import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class AssignRoomDto {
    @ApiProperty({ description: 'The ID of the student being assigned to the room' })
    @IsString()
    @IsNotEmpty()
    studentId: string;
}

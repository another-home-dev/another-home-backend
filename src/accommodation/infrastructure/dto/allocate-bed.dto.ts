import { ApiProperty } from '@nestjs/swagger';

export class AllocateBedDto {
    @ApiProperty({
        example: 'STU-2023-045',
        description: 'The unique Student ID being allocated'
    })
    studentId: string;

    @ApiProperty({
        example: 'BED-A101-01',
        description: 'The exact ID of the bed being assigned'
    })
    bedId: string;
}
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateBedDto {
    @ApiProperty({ description: 'The unique ID of the bed' })
    @IsString()
    @IsNotEmpty()
    bedId: string;

    @ApiProperty({ description: 'The display number or name of the bed' })
    @IsString()
    @IsNotEmpty()
    bedNumber: string;

    @ApiProperty({ description: 'The ID of the room this bed belongs to' })
    @IsString()
    @IsNotEmpty()
    roomId: string;
}

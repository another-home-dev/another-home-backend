import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateBuildingDto {
    @ApiProperty({ example: 'Sunrise Block', description: 'The name of the building' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: '12 Lake Road, Colombo', description: 'The physical address of the building' })
    @IsString()
    @IsNotEmpty()
    address: string;

    @ApiProperty({ example: 4, description: 'Number of floors in the building' })
    @IsNumber()
    @IsPositive()
    floorCount: number;
}

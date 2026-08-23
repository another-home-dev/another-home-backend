import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsPositive, IsIn, IsOptional } from 'class-validator';

export class UpdateRoomDto {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    roomNumber?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    @IsPositive()
    capacity?: number;

    @ApiProperty({ required: false, enum: ['Male', 'Female', 'Neutral'] })
    @IsOptional()
    @IsIn(['Male', 'Female', 'Neutral'])
    gender?: 'Male' | 'Female' | 'Neutral';

    @ApiProperty({ required: false, enum: ['AC', 'Non-AC'] })
    @IsOptional()
    @IsIn(['AC', 'Non-AC'])
    airConditioning?: 'AC' | 'Non-AC';

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    @IsPositive()
    rentPerMonth?: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    floor?: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    buildingId?: string;
}

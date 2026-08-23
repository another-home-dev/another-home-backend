import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

export class CreateStudentDto {
    @ApiProperty({ example: 'AH-1000', description: 'The unique student code' })
    @IsString()
    @IsNotEmpty()
    studentCode: string;

    @ApiProperty({ example: 'Ishara Perera', description: "The student's full name" })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'ishara.perera@student.anotherhome.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: '+94 71 234 5678' })
    @IsString()
    @IsNotEmpty()
    contact: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    guardianName?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    guardianContact?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    address?: string;
}

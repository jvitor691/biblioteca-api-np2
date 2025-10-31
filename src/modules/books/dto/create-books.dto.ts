import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreateBookDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  isbn: string;

  @ApiProperty()
  @IsInt()
  publishedYear: number;

  @ApiProperty()
  @IsInt()
  @Min(1)
  authorId: number;

  @ApiProperty()
  @IsInt()
  @Min(1)
  categoryId: number;

 
  @ApiProperty()
  @IsInt()
  @Min(1)
  totalCopies: number;

  @ApiProperty()
  @IsInt()
  @Min(0)
  availableCopies: number;
}

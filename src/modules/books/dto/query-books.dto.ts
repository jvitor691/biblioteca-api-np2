import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBooleanString, IsInt, IsOptional, IsString } from 'class-validator';

export class QueryBookDto {
  @ApiPropertyOptional() @IsOptional() @IsString()
  title?: string;

  @ApiPropertyOptional() @IsOptional() @IsInt()
  authorId?: number;

  @ApiPropertyOptional() @IsOptional() @IsInt()
  categoryId?: number;

  @ApiPropertyOptional({ description: 'Se "true", retorna apenas livros com availableCopies > 0' })
  @IsOptional() @IsBooleanString()
  availableOnly?: string; 
}

import { PartialType } from '@nestjs/swagger';
import { CreateBookDto } from './create-books.dto';

export class UpdateBookDto extends PartialType(CreateBookDto) {}

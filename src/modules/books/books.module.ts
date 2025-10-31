import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { PrismaService } from '../../../prisma/prisma.service';
import { BooksRepository } from './books.repository';

@Module({
  controllers: [BooksController],
  providers: [BooksService, PrismaService, BooksRepository]
})
export class BooksModule {}

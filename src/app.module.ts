import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthorsModule } from './modules/authors/authors.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { BooksModule } from './modules/books/books.module';

@Module({
  imports: [AuthorsModule, CategoriesModule, BooksModule],
  providers: [PrismaService],
})
export class AppModule {}

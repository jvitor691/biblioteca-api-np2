import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class BooksRepository {
  private readonly client: PrismaClient['book'];

  constructor(private readonly prisma: PrismaService) {
    this.client = this.prisma.book;
  }

  create(data: Prisma.BookCreateInput) {
    return this.client.create({ data });
  }

  
  findAll(args: Prisma.BookFindManyArgs) {
    return this.client.findMany(args);
  }

  
  findById(id: number, include = false) {
    return this.client.findUnique({
      where: { id },
      include: include ? { author: true, category: true } : undefined,
    });
  }

  
  update(id: number, data: Prisma.BookUpdateInput | Prisma.BookUncheckedUpdateInput) {
    return this.client.update({ where: { id }, data });
  }

  delete(id: number) {
    return this.client.delete({ where: { id } });
  }
}

import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { BooksRepository } from './books.repository';
import { CreateBookDto } from './dto/create-books.dto';
import { UpdateBookDto } from './dto/update-books.dto';
import { QueryBookDto } from './dto/query-books.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class BooksService {
  constructor(private readonly repo: BooksRepository) {}

  private validateCopies(total: number, available: number) {
    if (available > total) {
      throw new BadRequestException('availableCopies não pode ser maior que totalCopies.');
    }
  }

  async create(dto: CreateBookDto) {
    const total = dto.totalCopies ?? 1;
    const available = dto.availableCopies ?? 1;
    this.validateCopies(total, available);

    
    const data: Prisma.BookCreateInput = {
      title: dto.title,
      isbn: dto.isbn,
      publishedYear: dto.publishedYear,
      totalCopies: total,
      availableCopies: available,
      author:   { connect: { id: dto.authorId } },
      category: { connect: { id: dto.categoryId } },
    };

    return this.repo.create(data);
  }

  async findAll(query: QueryBookDto) {
    const { title, authorId, categoryId, availableOnly } = query;

    return this.repo.findAll({
      where: {
        ...(title ? { title: { contains: title, mode: 'insensitive' } } : {}),
        ...(authorId ? { authorId: Number(authorId) } : {}),
        ...(categoryId ? { categoryId: Number(categoryId) } : {}),
        ...(availableOnly === 'true' ? { availableCopies: { gt: 0 } } : {}),
      },
      include: { author: true, category: true },
      orderBy: { title: 'asc' },
    });
  }

  async findOne(id: number) {
    const book = await this.repo.findById(id, true);
    if (!book) throw new NotFoundException('Livro não encontrado.');
    return book;
  }

  async update(id: number, dto: UpdateBookDto) {
    const current = await this.repo.findById(id);
    if (!current) throw new NotFoundException('Livro não encontrado.');

    const total = dto.totalCopies ?? current.totalCopies;
    const available = dto.availableCopies ?? current.availableCopies;
    this.validateCopies(total, available);

    
    const data: Prisma.BookUncheckedUpdateInput = {
      title: dto.title,
      isbn: dto.isbn,
      publishedYear: dto.publishedYear,
      totalCopies: dto.totalCopies,
      availableCopies: dto.availableCopies,
      authorId: dto.authorId,
      categoryId: dto.categoryId,
    };

    return this.repo.update(id, data);
  }

  async remove(id: number) {
    const exists = await this.repo.findById(id);
    if (!exists) throw new NotFoundException('Livro não encontrado.');
    await this.repo.delete(id);
    return { message: 'Livro removido com sucesso.' };
  }
}

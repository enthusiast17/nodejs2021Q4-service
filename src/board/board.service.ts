import { Injectable } from '@nestjs/common';
import { Board } from '@prisma/client';
import { PrismaService } from 'src/common/prisma.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Injectable()
export class BoardService {
  constructor(private prisma: PrismaService) {}

  async create(createBoardDto: CreateBoardDto): Promise<Board> {
    return this.prisma.board.create({
      data: {
        title: createBoardDto.title,
        columns: {
          createMany: {
            data: createBoardDto.columns,
          },
        },
      },
      include: {
        columns: true,
      },
    });
  }

  async findAll(): Promise<Board[]> {
    return this.prisma.board.findMany({
      include: {
        columns: true,
      },
    });
  }

  async findById(id: string): Promise<Board | null> {
    return this.prisma.board.findUnique({
      where: { id },
      include: { columns: true },
    });
  }

  async update(id: string, updateBoardDto: UpdateBoardDto): Promise<Board> {
    return this.prisma.$transaction(async (prisma) => {
      await Promise.all(
        updateBoardDto.columns.reverse().map(async (column) =>
          this.prisma.boardColumn.update({
            data: column,
            where: {
              id: column.id,
            },
          }),
        ),
      );
      return prisma.board.update({
        data: {
          title: updateBoardDto.title,
        },
        include: {
          columns: true,
        },
        where: { id },
      });
    });
  }

  async remove(id: string): Promise<Board | null> {
    return this.prisma.board.delete({ where: { id } });
  }
}

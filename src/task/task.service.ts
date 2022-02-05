import { Injectable } from '@nestjs/common';
import { Board, Task } from '@prisma/client';
import { PrismaService } from 'src/common/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async create(boardId: string, createTaskDto: CreateTaskDto): Promise<Task> {
    return this.prisma.task.create({
      data: {
        title: createTaskDto.title,
        description: createTaskDto.description,
        order: createTaskDto.order,
        userId: createTaskDto.userId ?? null,
        boardId: boardId ?? null,
        columnId: createTaskDto.columnId ?? null,
      },
    });
  }

  async findAll(boardId: string): Promise<Task[]> {
    return this.prisma.task.findMany({ where: { boardId } });
  }

  async findBoardById(boardId: string): Promise<Board | null> {
    return this.prisma.board.findUnique({ where: { id: boardId } });
  }

  async findById(taskId: string): Promise<Task | null> {
    return this.prisma.task.findUnique({ where: { id: taskId } });
  }

  async update(taskId: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    return this.prisma.task.update({
      data: updateTaskDto,
      where: { id: taskId },
    });
  }

  async remove(taskId: string): Promise<Task | null> {
    return this.prisma.task.delete({ where: { id: taskId } });
  }
}

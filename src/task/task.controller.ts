import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  NotFoundException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('boards')
export class TaskController {
  constructor(readonly taskService: TaskService) {}

  @Post(':boardId/tasks')
  async create(
    @Param('boardId') boardId: string,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    if (!(await this.taskService.findBoardById(boardId))) {
      throw new NotFoundException();
    }
    return this.taskService.create(boardId, createTaskDto);
  }

  @Get(':boardId/tasks')
  async findAll(@Param('boardId') boardId: string) {
    if (!(await this.taskService.findBoardById(boardId))) {
      throw new NotFoundException();
    }
    const tasks = await this.taskService.findAll(boardId);
    if (tasks && tasks.length === 0) {
      throw new NotFoundException();
    }
    return tasks;
  }

  @Get(':boardId/tasks/:taskId')
  async findOne(
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string,
  ) {
    if (!(await this.taskService.findBoardById(boardId))) {
      throw new NotFoundException();
    }
    const task = await this.taskService.findById(taskId);
    if (!task) {
      throw new NotFoundException();
    }
    return task;
  }

  @Put(':boardId/tasks/:taskId')
  async update(
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    if (
      !(await this.taskService.findBoardById(boardId)) ||
      !(await this.taskService.findById(taskId))
    ) {
      throw new NotFoundException();
    }
    return this.taskService.update(taskId, updateTaskDto);
  }

  @Delete(':boardId/tasks/:taskId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string,
  ) {
    if (
      !(await this.taskService.findBoardById(boardId)) ||
      !(await this.taskService.findById(taskId))
    ) {
      throw new NotFoundException();
    }
    return this.taskService.remove(taskId);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Put,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Controller('boards')
@UseGuards(JwtAuthGuard)
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  async create(@Body() createBoardDto: CreateBoardDto) {
    return this.boardService.create(createBoardDto);
  }

  @Get()
  async findAll() {
    const boards = await this.boardService.findAll();
    if (boards && boards.length === 0) {
      throw new NotFoundException();
    }
    return boards;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const board = await this.boardService.findById(id);
    if (!board) {
      throw new NotFoundException();
    }
    return board;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBoardDto: UpdateBoardDto,
  ) {
    if (!(await this.boardService.findById(id))) {
      throw new NotFoundException();
    }
    return this.boardService.update(id, updateBoardDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    if (!(await this.boardService.findById(id))) {
      throw new NotFoundException();
    }
    return this.boardService.remove(id);
  }
}

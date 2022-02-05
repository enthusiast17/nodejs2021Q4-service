import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { toUserResponse } from 'src/common/responses';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    return res
      .status(HttpStatus.CREATED)
      .json(toUserResponse(await this.userService.create(createUserDto)));
  }

  @Get()
  async findAll(@Res() res: Response) {
    return res
      .status(HttpStatus.OK)
      .json((await this.userService.findAll()).map(toUserResponse));
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    return res
      .status(HttpStatus.OK)
      .json(toUserResponse(await this.userService.findById(id)));
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ) {
    return res
      .status(HttpStatus.OK)
      .json(toUserResponse(await this.userService.update(id, updateUserDto)));
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    return res
      .status(HttpStatus.NO_CONTENT)
      .json(await this.userService.remove(id));
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  Put,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { toUserResponse } from 'src/common/responses';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return toUserResponse(await this.userService.create(createUserDto));
  }

  @Get()
  async findAl() {
    return (await this.userService.findAll()).map(toUserResponse);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return toUserResponse(await this.userService.findById(id));
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return toUserResponse(await this.userService.update(id, updateUserDto));
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    return await this.userService.remove(id);
  }
}

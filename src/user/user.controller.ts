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
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { toUserWithoutPassword } from 'src/common/utils';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return toUserWithoutPassword(await this.userService.create(createUserDto));
  }

  @Get()
  async findAll() {
    const users = await this.userService.findAll();
    if (users && users.length === 0) {
      throw new NotFoundException();
    }
    return users.map(toUserWithoutPassword);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new NotFoundException();
    }
    return toUserWithoutPassword(user);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    if (!(await this.userService.findById(id))) {
      throw new NotFoundException();
    }
    return toUserWithoutPassword(
      await this.userService.update(id, updateUserDto),
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    if (!(await this.userService.findById(id))) {
      throw new NotFoundException();
    }
    return await this.userService.remove(id);
  }
}

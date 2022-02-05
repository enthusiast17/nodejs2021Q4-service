import { PickType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateBoardColumnDto, CreateBoardDto } from './create-board.dto';

export class UpdateBoardDto extends PickType(CreateBoardDto, ['title']) {
  columns: UpdateBoardColumnDto[];
}

export class UpdateBoardColumnDto extends CreateBoardColumnDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  boardId: string;
}

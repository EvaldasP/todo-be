import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class TodoDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public readonly title!: string;
}

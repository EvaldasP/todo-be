import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class TodoStatusDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  public readonly isCompleted!: boolean;
}

import { IsBoolean, IsNotEmpty } from 'class-validator';

export class TodoStatusDto {
  @IsNotEmpty()
  @IsBoolean()
  public readonly isCompleted!: boolean;
}

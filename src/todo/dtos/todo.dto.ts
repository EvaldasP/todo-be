import { IsNotEmpty, IsString } from 'class-validator';

export class TodoDto {
  @IsNotEmpty()
  @IsString()
  public readonly title!: string;
}

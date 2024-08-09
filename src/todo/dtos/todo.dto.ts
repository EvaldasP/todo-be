import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class TodoDto {
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsNotEmpty()
  @IsBoolean()
  completed!: boolean;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public readonly username!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public readonly password!: string;
}

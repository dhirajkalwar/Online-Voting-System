import { IsEmail, IsNotEmpty, IsString, IsMobilePhone, Length } from 'class-validator';

export class SignInDto {
  
  @IsNotEmpty()
  @IsString()
  voterId: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
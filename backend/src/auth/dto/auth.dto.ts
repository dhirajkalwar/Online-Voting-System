import { IsEmail, IsNotEmpty, IsString, IsMobilePhone, Length } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()  // Adjust locale as needed
  mobileNo: string;

  @IsNotEmpty()
  @Length(12, 12)  // Aadhaar number is 12 digits
  aadhaarNo: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
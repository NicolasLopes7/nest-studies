import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreatePlayerDTO {
  @IsNotEmpty()
  phoneNumber: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  name: string;
}

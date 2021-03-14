import { IsNotEmpty } from 'class-validator';

export class UpdatePlayerDTO {
  @IsNotEmpty()
  name: string;
}

import { IsNotEmpty, IsNumber, IsOptional, IsString,} from "class-validator";
import { PrimaryGeneratedColumn } from 'typeorm';
export class CreateItemDto {
  @PrimaryGeneratedColumn() // Automatically generates an ID
  id: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber({}, { message: (v) => (`${v.property}: ควรเป็นตัวเลข`)}) // Custom message for amount
  @IsNotEmpty()
  amount: number;

  @IsNumber({}, { message: (v) => (`${v.property}: ควรเป็นตัวเลข`)})
  @IsNotEmpty()
  quantity: number;

  @IsOptional()
  user_id: number;
  status: string;
}

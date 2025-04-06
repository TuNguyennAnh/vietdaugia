import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  startingPrice: number;

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsString()
  description?: string;

  @IsString()
  category?: string;
}

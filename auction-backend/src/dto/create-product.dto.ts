import { IsNotEmpty, IsNumber, IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsNotEmpty()
  @IsNumber()
  startingPrice: number;

  @IsOptional()
  @IsDateString() // ⚠️ Dùng ISO format như "2025-04-20T09:00:00Z"
  endTime?: string;

  @IsOptional()
  @IsString()
  image?: string;
}

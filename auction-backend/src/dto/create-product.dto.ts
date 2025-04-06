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

  @IsNotEmpty()
  @IsString()
  image: string;

  // ✅ THÊM TRƯỜNG NÀY nếu muốn cho phép người dùng chọn thời gian kết thúc
  @IsOptional()
  @IsDateString()
  endTime?: string;
}

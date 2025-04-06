import { IsNotEmpty, IsNumber, IsString, IsOptional, IsDateString } from 'class-validator';

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

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsDateString()
  endTime?: string; // 👈 Thêm dòng này nếu muốn cho chọn thời gian kết thúc
}

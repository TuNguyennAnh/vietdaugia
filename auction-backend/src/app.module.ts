import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module'; // 👈 tạo sau
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://khosithuyminh:anhtu123aA@cluster0.bds7eff.mongodb.net/auctiondb?retryWrites=true&w=majority&appName=Cluster0'
    ),
    ProductsModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}

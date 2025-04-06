import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller'; // thêm dòng này
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [UsersService],
  controllers: [UsersController], // thêm dòng này
  exports: [UsersService],
})
export class UsersModule {}

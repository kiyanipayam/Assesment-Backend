import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from '../Application/Controllers/user.controller';
import { UserService } from '../Services/user.service';
import { User, UserSchema } from "../Domain/user.schema";
import { secret } from '../utils/constants';
import { UserRepository } from '../DataAccess/user.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),

  JwtModule.register({
    secret,
    signOptions: { expiresIn: '2h' },
  }),],

  controllers: [UserController],

  providers: [UserService, UserRepository],

  exports: [JwtModule.register({
    secret,
    signOptions: { expiresIn: '2h' },
  }), UserService, MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UserRepository
  ],

})
export class UserModule {

}

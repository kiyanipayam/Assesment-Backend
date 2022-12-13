import { Module, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from "./Modules/user.module";
import { PostModule } from './Modules/post.module';
import { isAuthenticated } from './Application/Middlewares/app.middleware';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/test'),
    UserModule,
    PostModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(isAuthenticated)
      .forRoutes("posts");
  }
}



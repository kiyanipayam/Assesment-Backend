import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from '../Domain/post.schema';
import { PostController } from '../Application/Controllers/post.controller';
import { PostService } from '../Services/post.service';
import { UserModule } from './user.module';
import { PostRepository } from '../DataAccess/post.repository';


@Module({
  imports: [MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]), UserModule],
  controllers: [PostController],
  providers: [PostService, PostRepository],
  exports: [PostService],
})
export class PostModule {


}
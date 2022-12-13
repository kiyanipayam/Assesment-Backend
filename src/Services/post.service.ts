
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { PostRepository } from "../DataAccess/post.repository";
import { CreateUpdatePostReponseDTO } from "./DTOs/post/create-post-response.dto";
import { CreatePostDTO } from "./DTOs/post/create-post.dto";
import { UserService } from "./user.service";
import { Post, PostDocument } from "../Domain/post.schema";
import { UpdatePostDTO } from "./DTOs/post/update-post.dto";
import { ObjectId } from "mongoose";
import { PostDTO } from "./DTOs/post/post.dto";
@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository,
  ) { }

  async CreatePost(user: any, postDTO: CreatePostDTO): Promise<CreateUpdatePostReponseDTO> {
    var post = await this.postRepository.createPost(postDTO.title, postDTO.body, user._id);
    return new CreateUpdatePostReponseDTO(post.title, post.body, post.createdDate, post._id.toString())
  }

  async UpdatePost(user: any, postDTO: UpdatePostDTO): Promise<CreateUpdatePostReponseDTO> {
    var post = await this.postRepository.updatePost(postDTO.id, postDTO.title, postDTO.body, user._id);
    return new CreateUpdatePostReponseDTO(post.title, post.body, post.createdDate, post._id.toString())
  }
  async GetPostById(id: string): Promise<PostDTO> {
    var post = await this.postRepository.findById(id);
    return new PostDTO(post._id.toString(), post.body, post.title, post.createdDate, post.user.fullname, post.user.email, 0);
  }
  async GetUserPosts(userId: string): Promise<Array<PostDTO>> {
    var posts = await this.postRepository.findByUserId(userId);
    var result: PostDTO[] = new Array(posts.length);
    for (let i = 0; i < posts.length; i++) {
      result[i] = new PostDTO(
        posts[i]._id.toString(), posts[i].body, posts[i].title, posts[i].createdDate, posts[i].user.fullname, posts[i].user.email, 0)
    }

    return result;
  }

  async GetAllPosts(userId: ObjectId): Promise<Array<PostDTO>> {
    var posts = await this.postRepository.findAll();
    var result: PostDTO[] = new Array(posts.length);
    var ids: ObjectId[] = new Array(posts.length)
    for (let i = 0; i < posts.length; i++) {
      result[i] = new PostDTO(
        posts[i]._id.toString(), posts[i].body, posts[i].title, posts[i].createdDate, posts[i].user.fullname, posts[i].user.email, posts[i].viewedBy.length
      )
      ids[i] = posts[i]._id
    }
    await this.postRepository.updateViews(ids, userId);
    return result;
  }

  async DeletePost(postId: string, userId: string): Promise<string> {
    return await this.postRepository.deletePost(postId, userId);
  }
}

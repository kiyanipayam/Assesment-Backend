import { Body, Controller, Delete, Get, HttpStatus, Param, Post, UploadedFiles, Put, Req, Res, HttpException } from '@nestjs/common';
import { UpdatePostDTO } from '../../Services/DTOs/post/update-post.dto';
import { CreatePostDTO } from '../../Services/DTOs/post/create-post.dto';

import { PostService } from '../../Services/post.service';
@Controller('posts')
export class PostController {

  constructor(private readonly postService: PostService) { }

  @Post("create")
  async createPost(@Res() response, @Req() request, @Body() postDTO: CreatePostDTO) {
    const result = await this.postService.CreatePost(request.user, postDTO);
    return response.status(HttpStatus.OK).json(result)
  }

  @Post("update")
  async updatePost(@Res() response, @Req() request, @Body() postDTO: UpdatePostDTO) {
    const result = await this.postService.UpdatePost(request.user, postDTO);
    return response.status(HttpStatus.OK).json(result)
  }


  @Delete("delete/:id")
  async deletePost(@Param('id') id: string, @Res() response, @Req() request) {
    const result = await this.postService.DeletePost(id, request.user._id);
    return response.status(HttpStatus.OK).json({ id: result })
  }

  @Get("get/:id")
  async GetPostById(@Param('id') id: string, @Res() response, @Req() request) {
    const result = await this.postService.GetPostById(id);
    return response.status(HttpStatus.OK).json(result)
  }

  @Get("getByUserId")
  async GetPostByUserId(@Res() response, @Req() request) {
    const result = await this.postService.GetUserPosts(request.user._id);
    return response.status(HttpStatus.OK).json(result)
  }

  @Get("getFeed")
  async GetAllPosts(@Res() response, @Req() request) {
    const result = await this.postService.GetAllPosts(request.user._id);
    return response.status(HttpStatus.OK).json(result)
  }
}


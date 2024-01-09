import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { FileSystemStoredFile, FormDataRequest } from 'nestjs-form-data';
import { AuthGuard } from '@nestjs/passport';
import { post } from './schema/post.schema';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('/create')
  @UseGuards(AuthGuard())
  @FormDataRequest({ storage: FileSystemStoredFile })
  async create(@Body() createPostDto: CreatePostDto, @Req() req): Promise<{ post: post; message: string }> {
    return this.postService.create(createPostDto, req.user);
  }

  @Get('/all')
  async get_all_posts_by_user(): Promise<{ posts: post[]; message: string }> {
    return this.postService.find_all_posts();
  }

  @Get(':postId')
  async findOne(@Param('postId') postId: string): Promise<{ post: post }> {
    return this.postService.find_one_post(postId);
  }

  @Patch('/update/:postId')
  @UseGuards(AuthGuard())
  @FormDataRequest({ storage: FileSystemStoredFile })
  async update(@Param('postId') postId: string, @Body() updatePostDto: UpdatePostDto): Promise<{ post: post; message: string }> {
    return this.postService.update_post_by_user(postId, updatePostDto);
  }

  @Delete('/delete/:postId')
  @UseGuards(AuthGuard())
  async remove(@Param('postId') postId: string): Promise<{ post: post; message: string }> {
    return this.postService.delete_post_by_the_user(postId);
  }
}

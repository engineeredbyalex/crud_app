import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { post, post_model } from './schema/post.schema';
import mongoose from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class PostService {
  constructor(@InjectModel(post_model) private postModel: mongoose.Model<post>, private readonly ConfigService: ConfigService) {}

  async create(createPostDto: CreatePostDto, userInfo): Promise<{ post: post; message: string }> {
    const { title, description, image, link, visibility } = createPostDto;

    cloudinary.config({
      cloud_name: this.ConfigService.get('cloud_name'),
      api_key: this.ConfigService.get('api_key'),
      api_secret: this.ConfigService.get('api_secret'),
    });

    const data = await cloudinary.uploader.upload(image.path);

    const new_post = await this.postModel.create({
      user_id: userInfo._id,
      title,
      description,
      image: data.url,
      link,
      visibility,
    });

    return {
      post: new_post,
      message: 'Post Created',
    };
  }

  async find_all_posts(): Promise<{ posts: post[]; message: string }> {
    const posts = await this.postModel.find();
    return {
      posts: posts,
      message: 'All posts fetched successfully',
    };
  }

  async find_one_post(postId: string): Promise<{ post: post }> {
    const post = await this.postModel.findById(postId);
    return {
      post: post,
    };
  }

  async update_post_by_user(postId: string, updatePostDto: UpdatePostDto): Promise<{ post: post; message: string }> {
    const { title, description, old_image, new_image, link, visibility } = updatePostDto;
    let url = '';

    cloudinary.config({
      cloud_name: this.ConfigService.get('cloud_name'),
      api_key: this.ConfigService.get('api_key'),
      api_secret: this.ConfigService.get('api_secret'),
    });

    if (new_image !== null && new_image !== undefined) {
      const splitImage = old_image.split('/');
      const imageFile = splitImage[splitImage.length - 1].split('.')[0];
      await cloudinary.uploader.destroy(imageFile);
      const data = await cloudinary.uploader.upload(new_image.path);
      url = data.url;
    } else {
      url = old_image;
    }

    const update_post = await this.postModel.findByIdAndUpdate(postId, {
      title,
      description,
      image: url,
      link,
      visibility,
    });

    return {
      post: update_post,
      message: 'Post updated successfully',
    };
  }

  async delete_post_by_the_user(postId: string): Promise<{ post: post; message: string }> {
    cloudinary.config({
      cloud_name: this.ConfigService.get('cloud_name'),
      api_key: this.ConfigService.get('api_key'),
      api_secret: this.ConfigService.get('api_secret'),
    });

    const postInfo = await this.postModel.findById(postId);

    if (postInfo) {
      const splitImage = postInfo.image.split('/');
      const imageFile = splitImage[splitImage.length - 1].split('.')[0];
      await cloudinary.uploader.destroy(imageFile);
      await this.postModel.findByIdAndDelete(postId);
    }

    return {
      post: postInfo,
      message: 'Post deleted successfully',
    };
  }
}

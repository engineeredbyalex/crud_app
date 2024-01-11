/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { post } from './schema/post.schema';
import mongoose from 'mongoose';
import { ConfigService } from '@nestjs/config';
export declare class PostService {
    private postModel;
    private readonly ConfigService;
    constructor(postModel: mongoose.Model<post>, ConfigService: ConfigService);
    create(createPostDto: CreatePostDto, userInfo: any): Promise<{
        post: post;
        message: string;
    }>;
    find_all_posts(): Promise<{
        posts: post[];
        message: string;
    }>;
    find_one_post(postId: string): Promise<{
        post: post;
    }>;
    update_post_by_user(postId: string, updatePostDto: UpdatePostDto): Promise<{
        post: post;
        message: string;
    }>;
    delete_post_by_the_user(postId: string): Promise<{
        post: post;
        message: string;
    }>;
}

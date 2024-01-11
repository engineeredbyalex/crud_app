import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { post } from './schema/post.schema';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    create(createPostDto: CreatePostDto, req: any): Promise<{
        post: post;
        message: string;
    }>;
    get_all_posts_by_user(): Promise<{
        posts: post[];
        message: string;
    }>;
    findOne(postId: string): Promise<{
        post: post;
    }>;
    update(postId: string, updatePostDto: UpdatePostDto): Promise<{
        post: post;
        message: string;
    }>;
    remove(postId: string): Promise<{
        post: post;
        message: string;
    }>;
}

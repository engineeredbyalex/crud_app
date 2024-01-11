"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const post_schema_1 = require("./schema/post.schema");
const mongoose_2 = require("mongoose");
const config_1 = require("@nestjs/config");
const cloudinary_1 = require("cloudinary");
let PostService = class PostService {
    constructor(postModel, ConfigService) {
        this.postModel = postModel;
        this.ConfigService = ConfigService;
    }
    async create(createPostDto, userInfo) {
        const { title, description, image, link, visibility } = createPostDto;
        cloudinary_1.v2.config({
            cloud_name: this.ConfigService.get('cloud_name'),
            api_key: this.ConfigService.get('api_key'),
            api_secret: this.ConfigService.get('api_secret'),
        });
        const data = await cloudinary_1.v2.uploader.upload(image.path);
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
    async find_all_posts() {
        const posts = await this.postModel.find();
        return {
            posts: posts,
            message: 'All posts fetched successfully',
        };
    }
    async find_one_post(postId) {
        const post = await this.postModel.findById(postId);
        return {
            post: post,
        };
    }
    async update_post_by_user(postId, updatePostDto) {
        const { title, description, old_image, new_image, link, visibility } = updatePostDto;
        let url = '';
        cloudinary_1.v2.config({
            cloud_name: this.ConfigService.get('cloud_name'),
            api_key: this.ConfigService.get('api_key'),
            api_secret: this.ConfigService.get('api_secret'),
        });
        if (new_image !== null && new_image !== undefined) {
            const splitImage = old_image.split('/');
            const imageFile = splitImage[splitImage.length - 1].split('.')[0];
            await cloudinary_1.v2.uploader.destroy(imageFile);
            const data = await cloudinary_1.v2.uploader.upload(new_image.path);
            url = data.url;
        }
        else {
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
    async delete_post_by_the_user(postId) {
        cloudinary_1.v2.config({
            cloud_name: this.ConfigService.get('cloud_name'),
            api_key: this.ConfigService.get('api_key'),
            api_secret: this.ConfigService.get('api_secret'),
        });
        const postInfo = await this.postModel.findById(postId);
        if (postInfo) {
            const splitImage = postInfo.image.split('/');
            const imageFile = splitImage[splitImage.length - 1].split('.')[0];
            await cloudinary_1.v2.uploader.destroy(imageFile);
            await this.postModel.findByIdAndDelete(postId);
        }
        return {
            post: postInfo,
            message: 'Post deleted successfully',
        };
    }
};
exports.PostService = PostService;
exports.PostService = PostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(post_schema_1.post_model)),
    __metadata("design:paramtypes", [mongoose_2.default.Model, config_1.ConfigService])
], PostService);
//# sourceMappingURL=post.service.js.map
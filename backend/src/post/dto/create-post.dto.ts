import { IsEmpty, IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';
import { FileSystemStoredFile, HasMimeType, MaxFileSize } from 'nestjs-form-data';

export class CreatePostDto {
    @IsEmpty({message:"You cannot pass user id"})
    readonly user_id : mongoose.Schema.Types.ObjectId
    @IsNotEmpty()
    readonly title: string
    @IsNotEmpty()
    readonly description: string
    @IsNotEmpty()
    readonly link: string
    @IsNotEmpty()
    readonly visibility: boolean
    @IsNotEmpty()
    @MaxFileSize(1e6, { message: "File is larger than 1MBs" })
    @HasMimeType(['image/jpeg','image/png','image/jpg'])
    image : FileSystemStoredFile
}

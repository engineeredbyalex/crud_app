import { IsNotEmpty } from 'class-validator';
import { FileSystemStoredFile, HasMimeType, MaxFileSize } from 'nestjs-form-data';

export class UpdatePostDto{
    @IsNotEmpty()
    readonly title: string
    @IsNotEmpty()
    readonly description: string
    @IsNotEmpty()
    readonly link: string
    @IsNotEmpty()
    readonly visibility: boolean
    @IsNotEmpty()
    readonly old_image: string
    readonly new_image : FileSystemStoredFile
}

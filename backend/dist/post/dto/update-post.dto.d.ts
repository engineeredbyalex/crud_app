import { FileSystemStoredFile } from 'nestjs-form-data';
export declare class UpdatePostDto {
    readonly title: string;
    readonly description: string;
    readonly link: string;
    readonly visibility: boolean;
    readonly old_image: string;
    readonly new_image: FileSystemStoredFile;
}

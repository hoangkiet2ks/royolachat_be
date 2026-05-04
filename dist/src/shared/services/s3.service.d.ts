import 'multer';
export declare class S3Service {
    private s3Client;
    constructor();
    uploadImage(file: Express.Multer.File, folder?: string): Promise<string>;
    deleteFile(fileUrl: string): Promise<void>;
}

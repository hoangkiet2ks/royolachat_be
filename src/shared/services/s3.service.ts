import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { v4 as uuidv4 } from 'uuid'
import envConfig from '@/shared/config'
import 'multer'

@Injectable()
export class S3Service {
  private s3Client: S3Client

  constructor() {
    this.s3Client = new S3Client({
      region: envConfig.AWS_REGION,
      credentials: {
        accessKeyId: envConfig.AWS_ACCESS_KEY_ID,
        secretAccessKey: envConfig.AWS_SECRET_ACCESS_KEY,
      },
    })
  }

  async uploadImage(file: Express.Multer.File, folder: string = 'chats'): Promise<string> {
    try {
      const fileExtension = file.originalname.split('.').pop()
      const fileName = `${folder}/${uuidv4()}.${fileExtension}`

      const command = new PutObjectCommand({
        Bucket: envConfig.AWS_S3_BUCKET_NAME,
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype,
        // Nếu bucket của bạn chặn public access, bạn sẽ cần cấu hình CloudFront hoặc Presigned URL.
        // Tạm thời giả định bucket cho phép đọc public.
      })

      await this.s3Client.send(command)

      return `https://${envConfig.AWS_S3_BUCKET_NAME}.s3.${envConfig.AWS_REGION}.amazonaws.com/${fileName}`
    } catch (error) {
      console.error('S3 Upload Error:', error)
      throw new InternalServerErrorException('Không thể tải ảnh lên hệ thống, vui lòng thử lại.')
    }
  }

  // Bổ sung thêm hàm xóa file để dọn dẹp ảnh cũ (tránh rác AWS)
  async deleteFile(fileUrl: string): Promise<void> {
    try {
      // Tách URL để lấy chính xác Key của file (ví dụ: avatars/xxx-yyy.jpg)
      // URL chuẩn: https://[bucket].s3.[region].amazonaws.com/avatars/file.png
      const urlParts = fileUrl.split('.com/')
      if (urlParts.length < 2) return // Nếu URL không chuẩn thì bỏ qua

      const key = urlParts[1]

      const command = new DeleteObjectCommand({
        Bucket: envConfig.AWS_S3_BUCKET_NAME,
        Key: key,
      })

      await this.s3Client.send(command)
    } catch (error) {
      console.error('S3 Delete Error:', error)
      // Chú ý: Bỏ qua (không ném lỗi) nếu không xóa được ảnh cũ, 
      // để không làm gián đoạn tiến trình lưu ảnh mới của user.
    }
  }
}
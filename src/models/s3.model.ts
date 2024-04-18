import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

export class S3 {
  private s3Client!: S3Client;
  constructor() {
    this.createS3Client();
  }

  createS3Client() {
    this.s3Client = new S3Client({
      region: process.env.AWS_BUCKET_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  async uploadFile(file: File) {
    const result = await this.s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${Date.now().toString()}-${file.name}.${file.type}`,
        Body: file,
      })
    );
    return result;
  }

  getS3Client() {
    return this.s3Client;
  }
}

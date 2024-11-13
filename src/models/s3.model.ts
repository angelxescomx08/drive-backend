import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import multer, { Multer } from "multer";
import multerS3 from "multer-s3";
import { environment } from "../config/environment";

export class S3 {
  private s3Client!: S3Client;
  private upload!: Multer;
  constructor() {
    this.createS3Client();
    this.createUpload();
  }

  createS3Client() {
    this.s3Client = new S3Client({
      region: environment.AWS_BUCKET_REGION,
      credentials: {
        accessKeyId: environment.AWS_ACCESS_KEY,
        secretAccessKey: environment.AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  createUpload() {
    const upload = multer({
      storage: multerS3({
        s3: this.getS3Client(),
        bucket: environment.AWS_BUCKET_NAME,
        metadata: function (req, file, cb) {
          cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
          const fileExtension = file.originalname.split(".").pop();
          const fileName = `${Date.now().toString()}-${
            file.fieldname
          }.${fileExtension}`;
          cb(null, fileName);
        },
      }),
    });
    this.upload = upload;
  }

  getUpload() {
    return this.upload;
  }

  getS3Client() {
    return this.s3Client;
  }

  async deleteFiles(keys: string[]) {
    const result = await Promise.all(
      keys.map((key) =>
        this.s3Client.send(
          new DeleteObjectCommand({
            Key: key,
            Bucket: environment.AWS_BUCKET_NAME,
          })
        )
      )
    );
    return result;
  }
}

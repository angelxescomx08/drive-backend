import { S3Client } from "@aws-sdk/client-s3";
import multer, { Multer } from "multer";
import multerS3 from "multer-s3";

export class S3 {
  private s3Client!: S3Client;
  private upload!: Multer;
  constructor() {
    this.createS3Client();
    this.createUpload();
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

  createUpload() {
    const upload = multer({
      storage: multerS3({
        s3: this.getS3Client(),
        bucket: process.env.AWS_BUCKET_NAME,
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
}

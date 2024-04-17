import { S3Client } from "@aws-sdk/client-s3";

export class S3 {
  private s3Client!: S3Client;
  constructor() {
    this.s3Client = new S3Client({
      credentials: {
        accessKeyId: "",
        secretAccessKey: "",
      },
    });
  }
}

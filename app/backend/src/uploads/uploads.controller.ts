import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as AWS from 'aws-sdk';

const BUCKET_NAME = 'bucket-abdddsss';

@Controller('upload')
export class UploadsController {
  @Post('')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    AWS.config.update({
      credentials: {
        accessKeyId: 'AWS_ACCESS_KEY_ID',
        secretAccessKey: 'AWS_SECRET_ACCESS_KEY',
      },
    });

    try {
      // CREATE A NEW BUCKET
      //  const upload = await new AWS.S3()
      //    .createBucket({ Bucket: BUCKET_NAME })
      //    .promise();

      const objectName = `${Date.now() + file.originalname}`;
      await new AWS.S3()
        .putObject({
          Body: file.buffer,
          Bucket: BUCKET_NAME,
          Key: objectName,
          ACL: 'public-read',
        })
        .promise();

      const url = `http://${BUCKET_NAME}/s3.amazonaws.com/${objectName}`;
      return { url };
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

"use server";
import { env } from "@/env";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: env.AWS_REGION!,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY!,
  },
});

const CONTENT_TYPE = "application/octet-stream";

export const putObject = async ({
  key,
  body,
  bucketName = env.AWS_BUCKET_NAME,
  contentType = CONTENT_TYPE,
}: {
  key: string;
  body: Buffer | Uint8Array | Blob | string;
  bucketName: string;
  contentType?: string;
}) => {
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    Body: body,
    ContentType: contentType,
  });
  return s3Client.send(command);
};

const EXPIRES_IN = 3600;

export const getPresignedUrl = async ({
  key,
  bucketName = env.AWS_BUCKET_NAME,
  expiresIn = EXPIRES_IN,
}: {
  key: string;
  bucketName?: string;
  expiresIn?: number;
}) => {
  const command = new GetObjectCommand({ Bucket: bucketName, Key: key });
  return getSignedUrl(s3Client, command, { expiresIn });
};

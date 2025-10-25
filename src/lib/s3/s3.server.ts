import { env } from "@/env";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "./s3-client";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

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

export const putObjects = ({
  keys,
  bodies,
  bucketName = env.AWS_BUCKET_NAME,
  contentTypes = [],
}: {
  keys: string[];
  bodies: (Buffer | Uint8Array | Blob | string)[];
  bucketName: string;
  contentTypes: string[];
}) => {
  // ensure the sizes of keys, bodies, and contentTypes match
  if (keys.length !== bodies.length) {
    throw new Error("Keys and bodies must have the same length");
  }
  if (contentTypes.length > 0 && contentTypes.length !== keys.length) {
    throw new Error(
      "ContentTypes must be empty or have the same length as keys"
    );
  }
  const commands = keys.map(
    (k, i) =>
      new PutObjectCommand({
        Bucket: bucketName,
        Key: k,
        Body: bodies[i],
        ContentType: contentTypes[i] || CONTENT_TYPE,
      })
  );
  return Promise.all(commands.map((cmd) => s3Client.send(cmd)));
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

"use server";
import { getServerSession } from "next-auth";

import { S3Client, S3ClientConfig, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { authOptions } from "@/lib/auth";

const s3ClientConfig: S3ClientConfig = {
  region: process.env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
};

const s3Client = new S3Client(s3ClientConfig);

export async function getSignedURL(fileName: string) {
  const session = await getServerSession(authOptions);
  console.log(session);

  if (!session) {
    return { error: { message: "You need to be signed in" } };
  }

  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: fileName,
  });

  const signedUrl = await getSignedUrl(s3Client, putObjectCommand, {
    expiresIn: 60,
  });
  return { success: { url: signedUrl } };
}
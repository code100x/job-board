'use server';

import { withServerActionAsyncCatcher } from '@/lib/async-catch';
import { ErrorHandler } from '@/lib/error';
import { SuccessResponse } from '@/lib/success';
import { ServerActionReturnType } from '@/types/api.types';
import { v4 as uuidv4 } from 'uuid';

type ResponseType = {
  message?: string;
  url?: string;
};
export const uploadFileAction = withServerActionAsyncCatcher<
  FormData,
  ServerActionReturnType<ResponseType>
>(async (formData) => {
  try {
    const CDN_BASE_UPLOAD_URL = process.env.CDN_BASE_UPLOAD_URL!;
    const CDN_BASE_ACCESS_URL = process.env.CDN_BASE_ACCESS_URL!;
    const CDN_API_KEY = process.env.CDN_API_KEY!;

    const file = formData.get('file') as File;
    const uniqueFileName = formData.get('uniqueFileName') || uuidv4();

    if (!file) {
      throw new ErrorHandler('File is required', 'BAD_REQUEST');
    }

    const uploadUrl = `${CDN_BASE_UPLOAD_URL}/${uniqueFileName}`;
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    const response = await fetch(uploadUrl, {
      method: 'PUT',
      headers: {
        AccessKey: CDN_API_KEY,
        'Content-Type': 'application/octet-stream',
      },
      body: fileBuffer,
    });

    if (response.ok) {
      return new SuccessResponse('File uploaded successfully', 200, {
        message: 'File uploaded successfully',
        url: `${CDN_BASE_ACCESS_URL}/${uniqueFileName}`,
      }).serialize();
    } else {
      throw new ErrorHandler('Failed to upload file', 'INTERNAL_SERVER_ERROR');
    }
  } catch (error) {
    console.error('Error during file upload:', error);
    throw new ErrorHandler('Failed to upload file', 'INTERNAL_SERVER_ERROR');
  }
});

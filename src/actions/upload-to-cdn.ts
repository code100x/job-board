'use server';

import { v4 as uuidv4 } from 'uuid';

type FileType = 'webp' | 'pdf';

export async function uploadFileAction(formData: FormData, fileType: FileType) {
  const CDN_BASE_UPLOAD_URL = process.env.CDN_BASE_UPLOAD_URL!;
  const CDN_BASE_ACCESS_URL = process.env.CDN_BASE_ACCESS_URL!;
  const CDN_API_KEY = process.env.CDN_API_KEY!;

  try {
    const file = formData.get('file') as File;
    const uniqueFileName = formData.get('uniqueFileName') || uuidv4(); // Generate unique key if not provided

    if (!file) {
      return { error: 'File is required', status: 400 };
    }
    const uploadUrl = `${CDN_BASE_UPLOAD_URL}/${uniqueFileName}.${fileType}`;
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
      return {
        message: 'File uploaded successfully',
        url: `${CDN_BASE_ACCESS_URL}/${uniqueFileName}.${fileType}`,
      };
    } else {
      return { error: 'Failed to upload file', status: response.status };
    }
  } catch (error) {
    console.error('Error uploading file:', error);
    return { error: 'Internal server error', status: 500 };
  }
}

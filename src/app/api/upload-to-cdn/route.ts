import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

const CDN_BASE_URL = `https://sg.storage.bunnycdn.com/${process.env.CDN_SZ_NAME}${process.env.CDN_BASE_PATH}`;
const CDN_API_KEY = process.env.CDN_API_KEY!;

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const uniqueFileName = formData.get('uniqueFileName') || uuidv4(); // Generate unique key if not provided

    if (!file) {
      return NextResponse.json({ error: 'File is required' }, { status: 400 });
    }

    const uploadUrl = `${CDN_BASE_URL}/${uniqueFileName}`;

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
      return NextResponse.json({
        message: 'File uploaded successfully',
        url: uploadUrl,
      });
    } else {
      return NextResponse.json(
        { error: 'Failed to upload file' },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error('Error uploading file to BunnyCDN:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.SECRET });
  const { pathname } = new URL(req.url);
  if (!token && (pathname === '/create' || pathname.startsWith('/manage'))) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }
  if (
    pathname === '/create' &&
    token?.role !== 'ADMIN' &&
    token?.role !== 'HR'
  ) {
    return NextResponse.redirect(new URL('/', req.url));
  }
  if (
    pathname !== '/create-profile' &&
    token?.role === 'USER' &&
    !token.onBoard
  ) {
    return NextResponse.redirect(new URL('/create-profile', req.url));
  }

  // Check if user is trying to access any manage route without a token
  if (pathname.startsWith('/manage') && !token) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

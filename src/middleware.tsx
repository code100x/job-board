import APP_PATHS from '@/config/path.config';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const authRoutes = ['/signup', '/signin'];
const privateRoutes = ['/create', '/setting'];
export async function middleware(request: NextRequest) {
  const session = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const currentPath = request.nextUrl.pathname;
  if (!session && privateRoutes.includes(currentPath)) {
    return NextResponse.redirect(
      new URL(
        `${APP_PATHS.SIGNIN}?next=${encodeURIComponent(currentPath)}`,
        request.url
      )
    );
  }
  if (authRoutes.includes(currentPath) && session) {
    return NextResponse.redirect(new URL(`${APP_PATHS.HOME}`, request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

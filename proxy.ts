import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Gate /home and /work/* behind access cookie
  if (pathname.startsWith('/home') || pathname.startsWith('/work')) {
    const access = request.cookies.get('auc-access');
    if (!access || access.value !== 'true') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/home/:path*', '/work/:path*'],
};

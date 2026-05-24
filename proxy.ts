import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  // Gate disabled — site is public
  // To re-enable: uncomment the block below and restore matcher
  //
  // const { pathname } = request.nextUrl;
  // if (pathname.startsWith('/home') || pathname.startsWith('/work')) {
  //   const access = request.cookies.get('auc-access');
  //   if (!access || access.value !== 'true') {
  //     return NextResponse.redirect(new URL('/', request.url));
  //   }
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [],
};

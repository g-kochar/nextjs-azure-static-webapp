import { auth } from '@/auth';
import { isNil } from '@lib';

export default auth((request) => {
  if (isNil(request.auth) && request.nextUrl.pathname !== '/login') {
    const newUrl = new URL('/login', request.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};

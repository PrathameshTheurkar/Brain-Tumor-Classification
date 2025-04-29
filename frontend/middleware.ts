import { NextResponse } from 'next/server'
import type { NextRequest} from 'next/server'
 
export function middleware(request: NextRequest) {
    console.log('inside middleware');
    // console.log('Middleware hit for:', request.nextUrl.pathname);
    // console.log('next cookies: ', request.cookies.get('token'));

    return NextResponse.redirect(new URL('/login', request.url));
}


export const config = {
  matcher: ["/dashboard"],
}
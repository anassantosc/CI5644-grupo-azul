import { NextResponse } from 'next/server';

const middleware = (req) => {
  const token = req.cookies.get('JWT');
  const { pathname } = req.nextUrl;

  //console.log("token ->", token);

  const isLoggedIn = !!token;

  if (!isLoggedIn && (pathname === "/profile" || pathname === "/album" || pathname === "/album")) {
    return NextResponse.redirect('/');
  }

  if (isLoggedIn && (pathname === "/login" || pathname === "/signup")) {
    return NextResponse.redirect('/');
  }
};

export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)',
};

export default middleware;

import { NextResponse } from 'next/server';


const middleware = (req) => {
  const token = req.cookies.get('JWT');

  console.log("token ->", token);

  const { pathname } = req.nextUrl;

  const tokenExist = token?.name === "JWT" && token?.value

  if (!tokenExist) {
    if (
      pathname === "/profile"
      || pathname === "album"
    )
      return NextResponse.redirect(new URL('/', req.url));
  }

  if (tokenExist) {
    if (
      pathname === "/login" 
      || pathname === "/register"
    )
      return NextResponse.redirect(new URL('/', req.url));
  }
}

export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)',
};

export default middleware;
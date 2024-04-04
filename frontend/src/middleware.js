import { NextResponse } from 'next/server';

const middleware = (req) => {
    const token = req.cookies.get('JWT');
    const tokenExist = token?.name === "JWT" && token?.value
    const { pathname } = req.nextUrl;

    //if (!tokenExist && (pathname === "/profile" || pathname === "/album" || pathname === "/store")) {
    //    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/login`);
    //}

    //if (tokenExist && (pathname === "/login" || pathname === "/signup")) {
    //    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/album`);
    //}
};

export const config = {
    matcher: '/((?!api|static|.*\\..*|_next).*)',
};

export default middleware;

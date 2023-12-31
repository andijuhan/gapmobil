import { NextResponse, NextRequest } from 'next/server';
import { validateSessionTokenWithJose } from './utils/jwt';

export const middleware = async (req: NextRequest, res: NextResponse) => {
   const token = req.cookies.get('token')?.value;
   const { pathname } = req.nextUrl;

   const validateToken: any = await validateSessionTokenWithJose(token || '');
   const isOwner = pathname.includes(validateToken?.id);

   if (pathname === '/api/auth/login') {
      return NextResponse.next();
   }

   if (pathname === '/api/users' && validateToken?.role !== 'SUPER ADMIN') {
      return NextResponse.json(null, { status: 401 });
   }

   if (pathname.includes('/api/users/')) {
      if (!validateToken) {
         return NextResponse.json(null, { status: 401 });
      }
      //jika bukan pemilik akun dan bukan super admin
      if (!isOwner && validateToken?.role !== 'SUPER ADMIN') {
         return NextResponse.json(null, { status: 401 });
      }
      return NextResponse.next();
   }

   return NextResponse.next();
};

export const config = {
   matcher: ['/api/:path*'],
};

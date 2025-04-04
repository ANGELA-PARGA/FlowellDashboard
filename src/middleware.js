import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';


export async function middleware(req) {
    const token = await getToken({ req });
    const { pathname } = req.nextUrl;

        // Protege rutas de la cuenta
        if (!token && (pathname.startsWith('/admin_panel'))){
            return NextResponse.redirect(new URL('/', req.url));
        }

        // Redirige si el usuario está autenticado y trata de acceder a / o /register o /recover_password
        if (token && (pathname === '/' || pathname === '/register' || pathname.startsWith('/recover_password'))) {
            return NextResponse.redirect(new URL('/admin_panel', req.url));
        }
}

export const config = {
    matcher: ['/admin_panel/:path*',  '/', '/register', '/recover_password'],
};


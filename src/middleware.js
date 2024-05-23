import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req) {
	const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
	const { pathname } = req.nextUrl;

	// Define the base path for private routes
	const basePath = '/chatbot';

	// Redirect to root page if user is not authenticated and trying to access a private route
	if (!token && pathname.startsWith(basePath)) {
		console.log(
			'Redirecting to home because of unauthenticated access to:',
			pathname
		);
		return NextResponse.redirect(new URL('/', req.url));
	}

	return NextResponse.next();
}

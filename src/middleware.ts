import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const publicRoutes = ['/signin', '/signup']

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  const currentUser = request.cookies.get('konahacustomer.token')?.value

  if (publicRoutes.includes(pathname) && !currentUser) {
    return NextResponse.next()
  }

  if (!currentUser) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }

  if (pathname === '/signin') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (pathname === '/signup  ') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}

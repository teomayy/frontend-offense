import { NextRequest, NextResponse } from 'next/server'

import { EnumTokens } from './services/auth-token.service'

export async function middleware(req: NextRequest) {
	const url = req.nextUrl.clone()
	const refreshToken = req.cookies.get(EnumTokens.REFRESH_TOKEN)?.value

	if (url.pathname === '/') {
		url.pathname = '/v1'
		return NextResponse.redirect(url)
	}

	if (!refreshToken) {
		if (!req.nextUrl.pathname.startsWith('/login')) {
			url.pathname = '/login'
			return NextResponse.redirect(url)
		}
		return NextResponse.next()
	}

	// Проверка роли пользователя из токена
	const userRole = await getUserRole(refreshToken)

	if (!userRole) {
		url.pathname = '/login'
		return NextResponse.redirect(url)
	}

	const isAdmin = userRole === 'admin'
	const isDoctor = userRole === 'inspector'

	if (req.nextUrl.pathname === '/v1') {
		if (isAdmin) {
			return NextResponse.redirect(new URL('/v1/admin-dashboard', req.url))
		} else if (isDoctor) {
			return NextResponse.redirect(new URL('/v1/inspector-dashboard', req.url))
		}
	}

	if (req.nextUrl.pathname.startsWith('/v1/admin-dashboard') && !isAdmin) {
		return NextResponse.redirect(new URL('/login', req.url))
	}

	if (req.nextUrl.pathname.startsWith('/v1/inspector-dashboard') && !isDoctor) {
		return NextResponse.redirect(new URL('/login', req.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/', '/v1/:path*', '/login/']
}

// Моделируем функцию получения роли пользователя
async function getUserRole(refreshToken: string): Promise<string | null> {
	try {
		const response = await fetch('http://localhost:4300/api/auth/verify-role', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${refreshToken}`
			},
			credentials: 'include'
		})

		if (!response.ok) {
			console.error('Ошибка ответа от сервера:', await response.text())
			return null
		}

		const data = await response.json()
		console.log('USER ROLE:', data.role)
		return data.role
	} catch (error) {
		console.error('Ошибка проверки роли пользователя:', error)
		return null
	}
}

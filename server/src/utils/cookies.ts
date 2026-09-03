import type { Response } from "express";


export function setRefreshTokenCookie (res: Response, refreshToken: string) { 
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true, // make cookie invisible to JS; only browser can send it automatically with requests
        secure: process.env.NODE_ENV === 'production', // if true, only send cookie over HTTPS
        sameSite: 'strict', // only send cookies when request is from this same site (CSRF protection)
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 day of holding this cookie 
        path: '/auth/refresh' // only attach to this route
    })
}
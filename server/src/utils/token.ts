import jwt from 'jsonwebtoken';
import type { JwtVerifyShape } from '../types/token.js';

// Access Token (short lived)
export function generateAccessToken(userId: number) { 
    return jwt.sign({id: userId}, process.env.JWT_ACCESS_SECRET!, {expiresIn: '24h'});
}


// Refresh Token - provides new access token
export function generateRefreshToken(userId: number){
    return jwt.sign({id: userId}, process.env.JWT_REFRESH_SECRET!, {expiresIn: '7d'});
}

// Verify token 
export function verifyToken(token : string, secret: string) : JwtVerifyShape {
    const decoded = jwt.verify(token, secret) 
    return decoded as JwtVerifyShape;
}


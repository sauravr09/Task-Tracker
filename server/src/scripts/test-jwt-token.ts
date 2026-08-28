import { generateAccessToken, verifyToken } from '../utils/token.js';

console.log(verifyToken(generateAccessToken(2), process.env.JWT_ACCESS_SECRET!));
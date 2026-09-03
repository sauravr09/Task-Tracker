import type { UserRegisterRequestBody, UserLoginRequestBody, AuthSuccess } from "../types/user.js"
import CustomError from "../utils/CustomError.js";
import { UserModel } from "../models/userModel.js"
import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken, verifyToken } from "../utils/token.js";
import ERROR_MESSAGES from "../constants/errorMessages.js";
import type { JwtVerifyShape } from "../types/token.js";

export const AuthService = {

    async register({username, email, password}: UserRegisterRequestBody) : Promise<AuthSuccess>{
        const existingUser = await UserModel.getUserByUsernameOrEmail(username, email);

        if (existingUser) {
            if (existingUser.username === username){
                throw new CustomError("Username is taken", 409);
            }
            if (existingUser.email === email){
                throw new CustomError("Email is already in use", 409)
            }
        }

        // hash password 
        const hashedPassword = await bcrypt.hash(password, 8);

        const newUserId = await UserModel.registerUser({username, email, password: hashedPassword});

        // generate access/refresh tokens for user
        const accessToken = generateAccessToken(newUserId);
        const refreshToken = generateRefreshToken(newUserId);

        return {user: {id: newUserId, username: username}, accessToken, refreshToken};

    },

    async login({identifier, password}: UserLoginRequestBody) : Promise<AuthSuccess> {
        
        const user = await UserModel.getUserByIdentifier(identifier);

        if (!user) { 
            throw new CustomError(ERROR_MESSAGES.INVALID_CREDENTIALS, 401);
        }

        // compare password
        const passwordMatch = await bcrypt.compare(password, user.password_hash);

        if(!passwordMatch){
            throw new CustomError(ERROR_MESSAGES.INVALID_CREDENTIALS, 401);
        }

        const accessToken = generateAccessToken(user.id);
        const refreshToken = generateRefreshToken(user.id);

        return {user: {id: user.id, username: user.username}, accessToken, refreshToken};

    },

    async refresh(refreshToken : string): Promise<string>{
        let decoded: JwtVerifyShape;
        try {
            decoded = verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET!);

        }catch(err){
            throw new CustomError("Invalid or Expired Refresh Token", 401);
        }

        return generateAccessToken(decoded.id);

    }
}
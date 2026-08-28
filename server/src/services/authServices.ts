import type { UserRegisterRequestBody, UserLoginRequestBody, UserRegisteredSuccess } from "../types/user.js"
import CustomError from "../utils/CustomError.js";
import { UserModel } from "../models/userModel.js"
import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";

export const AuthService = {

    async register({username, email, password}: UserRegisterRequestBody) : Promise<UserRegisteredSuccess | undefined>{
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

        return {userId: newUserId, accessToken, refreshToken};

        

    }

}
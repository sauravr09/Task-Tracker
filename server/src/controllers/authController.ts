import type { Request, NextFunction, Response } from "express";
import { AuthService } from "../services/authServices.js";
import type { UserLoginRequestBody, UserRegisterRequestBody } from "../types/user.js";
import { setRefreshTokenCookie } from "../utils/cookies.js";


export const AuthController = {

    async register(req : Request, res: Response, next: NextFunction) { 

        try {
            const {user, accessToken, refreshToken} = await AuthService.register(res.locals.cleanedData as UserRegisterRequestBody);

            setRefreshTokenCookie(res, refreshToken);

            return res.status(201).json({message: "Successfully Registered", user, accessToken, refreshToken})

        }catch (err){
            next(err);
        }
    },

    async login( req: Request, res: Response, next: NextFunction){
        try {
            const {user, accessToken, refreshToken} = await AuthService.login(res.locals.cleanedData as UserLoginRequestBody);
            
            setRefreshTokenCookie(res, refreshToken);

            return res.status(200).json({message: `Successfully logged in as ${user.username}`, user, accessToken, refreshToken});

        }catch(err){
            next(err);
        }
    },

    async refresh(req: Request, res: Response, next: NextFunction){

        try {
            const refreshToken = req.cookies.refreshToken;
            const accessToken = await AuthService.refresh(refreshToken);
            return res.status(200).json({accessToken});

        } catch (err) {
            next(err)
        }

    },

    async logout(req: Request, res: Response){
        res.clearCookie('refreshToken', {path: '/auth/refresh'});
        return res.status(200).json({message: "Logged out successfully"});
    }
     

}

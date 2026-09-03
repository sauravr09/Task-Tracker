import type { Request, Response, NextFunction } from "express";
import CustomError from "../utils/CustomError.js";

// Validate Register Form 
export function validateRegister(req: Request, res: Response, next: NextFunction) { 
    const {username, email, password} = req.body;

    if (!username?.trim()) { 
        return next(new CustomError("Username is Required", 400))
    }
    if(!email?.trim()){
        return next(new CustomError("Email is required", 400));
    }
    if(!password || password.length < 6){
        return next(new CustomError("Password must be atleast 6 characters long", 400));
    }

    // clean and add to request
    res.locals.cleanedData = {
        username: username.trim(), 
        email: email.trim(),
        password
    };

    return next();
}

// Validate Login Form
export function validateLogin(req: Request, res: Response, next: NextFunction) {
    const {identifier, password} = req.body;

    if(!identifier?.trim()){
        return next(new CustomError("Username or Email is required", 400));    
    }
    if(!password) { 
        return next(new CustomError("Password is required", 400));
    }

    res.locals.cleanedData = {
        identifier: identifier.trim(),
        password
    }

    return next();
}

export function validateRefresh(req: Request, res: Response, next: NextFunction) {
    const {refreshToken} = req.cookies;

    if (!refreshToken) { 
        return next(new CustomError("No refresh token provided", 401));
    }

    return next();

}
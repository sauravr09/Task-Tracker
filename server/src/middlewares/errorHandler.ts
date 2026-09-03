import type { ErrorRequestHandler } from 'express';
import CustomError from '../utils/CustomError.js';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.error(err);

    if (err instanceof CustomError) { 
        return res.status(err.statusCode).json({error: err.message});
    }

    return res.status(500).json({error: "Something went wrong"});


}
import jwt from 'jsonwebtoken';
import { Secret } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from './ApiResponse';
import { User } from '../models/User';
import logger from './logger';

export interface AuthResponse{
    auth: boolean,
    authToken?: string,
    message: string,
    data?: any
}

export class AuthMiddleware{
    private static SECRET_KEY : Secret = 'uH4K78qKVpZ59TgiaHiZWTvKPjRyLJB4';

    public static generateToken(user: User) : string {
    const payload = {
        uuid: user.uuid,
        name: user.name,
        email: user.email,
        };
        const authToken : string = jwt.sign(payload, AuthMiddleware.SECRET_KEY);

        return authToken
    }

    public static async authValidation(req : any, res : Response, next : NextFunction) : Promise<void | Response> {
        if (!req.headers['authorization']) {
            const apiResponse = ApiResponse.error("No access token provided", {})
            apiResponse.auth = {auth: false, message:"Auth Fail"};
            logger.error(apiResponse);
            return res.status(400).json(apiResponse);
          }
          const accessToken = req.headers.authorization.split(' ')[1];
          try {
            const decoded : any = jwt.verify(accessToken, AuthMiddleware.SECRET_KEY);
            req.userUuid = decoded.uuid;
            req.userName = decoded.name;
            req.userEmail = decoded.name;
            return next();
          } catch (error) {
            const apiResponse = ApiResponse.error(error.message, error);
            logger.error(apiResponse);
            return res.status(401).json(apiResponse);
          }
    }

}
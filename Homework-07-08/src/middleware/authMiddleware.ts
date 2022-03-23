import { NextFunction, Response } from 'express';
import { IRequestExtended } from '../interface';
import { tokenRepository } from '../repositories/token/tokenRepository';
import { tokenService } from '../services/tokenService';
import { userService } from '../services/userService';

class AuthMiddleware {
    public async checkToken(req: IRequestExtended, res: Response, next: NextFunction)
        : Promise<void | Error> {
        console.log(req);
        try {
            const accessToken = req.get('Authorization');
            if (!accessToken) {
                throw new Error('No token');
            }

            const tokenPairFromDb = await tokenRepository.findByParams({ accessToken });
            if (!tokenPairFromDb) {
                throw new Error('Token not valid');
            }

            const { userEmail } = await tokenService.verifyToken(accessToken);
            const userFromToken = await userService.getUserByEmail(userEmail);

            if (!userFromToken) {
                throw new Error('Token not valid');
            }

            req.user = userFromToken;

            next();
        } catch (e: any) {
            res.json({
                status: 400,
                message: e.message,
            });
        }
    }
}

export const authMiddleware = new AuthMiddleware();

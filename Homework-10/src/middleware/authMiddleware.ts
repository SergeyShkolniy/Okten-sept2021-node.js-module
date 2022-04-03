import { NextFunction, Response } from 'express';

import { IRequestExtended } from '../interface';
import { tokenRepository } from '../repositories';
import { tokenService, userService } from '../services';
import { authValidator } from '../validator';
import { ErrorHandler } from '../error';
import { actionTokenRepository } from '../repositories/actionToken/actionTokenRepository';

class AuthMiddleware {
    public async checkAccessToken(req: IRequestExtended, res: Response, next: NextFunction)
        : Promise<void | Error> {
        try {
            const accessToken = req.get('Authorization');
            if (!accessToken) {
                next(new ErrorHandler('No token'));
                return;
            }
            const tokenPairFromDb = await tokenRepository.findByParams({ accessToken });
            if (!tokenPairFromDb) {
                next(new ErrorHandler('Token not valid from DB', 401));
                return;
            }
            const { userEmail } = await tokenService.verifyToken(accessToken, 'accessToken');
            const userFromToken = await userService.getUserByEmail(userEmail);

            if (!userFromToken) {
                next(new ErrorHandler('Token not valid from User', 401));
                return;
            }

            req.user = userFromToken;

            next();
        } catch (e: any) {
            res.json({
                status: 401,
                message: e.message,
            });
        }
    }

    public async checkRefreshToken(req: IRequestExtended, res: Response, next: NextFunction)
        : Promise<void | Error> {
        try {
            const refreshToken = req.get('Authorization');
            if (!refreshToken) {
                next(new ErrorHandler('No token'));
                return;
            }

            const tokenPairFromDb = await tokenRepository.findByParams({ refreshToken });
            if (!tokenPairFromDb) {
                next(new ErrorHandler('Token not valid from DB', 401));
                return;
            }

            const { userEmail } = await tokenService.verifyToken(refreshToken, 'refresh');
            const userFromToken = await userService.getUserByEmail(userEmail);

            if (!userFromToken) {
                next(new ErrorHandler('Token not valid from User', 401));
                return;
            }

            req.user = userFromToken;

            next();
        } catch (e: any) {
            res.json({
                status: 401,
                message: e.message,
            });
        }
    }

    public async checkActionToken(req: IRequestExtended, res: Response, next: NextFunction)
        : Promise<void | Error> {
        try {
            const actionToken = req.get('Authorization');
            if (!actionToken) {
                next(new ErrorHandler('No token'));
                return;
            }

            const actionTokenFromDb = await actionTokenRepository.findByParams({ actionToken });
            if (!actionTokenFromDb) {
                next(new ErrorHandler('Token not valid from DB', 401));
                return;
            }

            const { userEmail } = await tokenService.verifyToken(actionToken, 'action');
            const userFromToken = await userService.getUserByEmail(userEmail);

            if (!userFromToken) {
                next(new ErrorHandler('Token not valid from User', 401));
                return;
            }

            req.user = userFromToken;

            next();
        } catch (e: any) {
            res.json({
                status: 401,
                message: e.message,
            });
        }
    }

    public validateLoginUser(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { error, value } = authValidator.login.validate(req.body);

            if (error) {
                next(new ErrorHandler(error.details[0].message));
                return;
            }

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    }

    public checkValidEmail(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { error, value } = authValidator.email.validate(req.body);

            if (error) {
                next(new ErrorHandler(error.details[0].message));
                return;
            }

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    }
}

export const authMiddleware = new AuthMiddleware();

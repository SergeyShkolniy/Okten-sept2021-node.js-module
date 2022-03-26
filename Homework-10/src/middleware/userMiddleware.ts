import { NextFunction, Response } from 'express';
import { IRequestExtended } from '../interface';
import { userRepository } from '../repositories/user/userRepository';
import { ErrorHandler } from '../error/errorHandler';

class UserMiddleware {
    async checkIsUserExist(req: IRequestExtended, res: Response, next: NextFunction):
        Promise<void> {
        try {
            const userFromDb = await userRepository.getUserByEmail(req.body.email);

            if (!userFromDb) {
                next(new ErrorHandler('wrong email or password'));
                return;
            }

            req.user = userFromDb;
            next();
        } catch (e: any) {
            res.status(400)
                .json(e.message);
        }
    }
}

export const userMiddleware = new UserMiddleware();

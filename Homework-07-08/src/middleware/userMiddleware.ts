import { NextFunction, Response } from 'express';
import { IRequestExtended } from '../interface';
import { userRepository } from '../repositories/user/userRepository';

class UserMiddleware {
    async checkIsUserExist(req: IRequestExtended, res: Response, next: NextFunction):
        Promise<void> {
        try {
            const userFromDb = await userRepository.getUserByEmail(req.body.email);

            if (!userFromDb) {
                throw new Error('wrong email or password');
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

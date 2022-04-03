import { NextFunction, Response } from 'express';

import { IRequestExtended } from '../interface';
import { userRepository } from '../repositories';
import { ErrorHandler } from '../error';
import { paramsValidator, userValidator } from '../validator';

class UserMiddleware {
    async checkIsUserExist(req: IRequestExtended, res: Response, next: NextFunction)
        : Promise<void> {
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

    async checkIsUserExistForCreate(req: IRequestExtended, res: Response, next: NextFunction)
        : Promise<void> {
        try {
            const { email, phone } = req.body;
            const userFromDb = await userRepository.getUserByEmailOrPhone(email, phone);

            if (userFromDb) {
                next(new ErrorHandler('wrong email or phone'));
                return;
            }

            next();
        } catch (e: any) {
            res.status(400)
                .json(e.message);
        }
    }

    public validateCreateUser(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { error, value } = userValidator.registration.validate(req.body);

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

    public validateId(req: IRequestExtended, res: Response, next: NextFunction)
        : Promise<void> | undefined {
        try {
            const { error, value } = paramsValidator.id.validate(req.params);

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

    public validateEmail(req: IRequestExtended, res: Response, next: NextFunction)
        : Promise<void> | undefined {
        try {
            const { error, value } = paramsValidator.email.validate(req.params);

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

    public validatePassword(req: IRequestExtended, res: Response, next: NextFunction)
        : Promise<void> | undefined {
        try {
            const { error, value } = userValidator.password.validate(req.body);

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

    public validateEmailAndPassword(req: IRequestExtended, res: Response, next: NextFunction)
        : Promise<void> | undefined {
        try {
            const { error, value } = paramsValidator.emailAndPassword.validate(req.body);

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

export const userMiddleware = new UserMiddleware();

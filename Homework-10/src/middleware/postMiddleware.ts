import { NextFunction, Response } from 'express';

import { IRequestExtended } from '../interface';
import { paramsValidator } from '../validator';
import { ErrorHandler } from '../error';

class PostMiddleware {
    public validateUserId(req: IRequestExtended, res: Response, next: NextFunction)
        : Promise<void> | undefined {
        try {
            const { error, value } = paramsValidator.userId.validate(req.params);

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
}

export const postMiddleware = new PostMiddleware();

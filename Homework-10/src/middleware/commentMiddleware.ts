import { NextFunction, Response } from 'express';
import { IRequestExtended } from '../interface';

import { ErrorHandler } from '../error';
import { commentValidator, paramsValidator } from '../validator';

class CommentMiddleware {
    public validateAuthorId(req: IRequestExtended, res: Response, next: NextFunction)
        : Promise<void> | undefined {
        try {
            const { error, value } = paramsValidator.authorId.validate(req.params);

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

    public validateCommentId(req: IRequestExtended, res: Response, next: NextFunction)
        : Promise<void> | undefined {
        try {
            const { error, value } = paramsValidator.commentId.validate(req.params);

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

    public validateAction(req: IRequestExtended, res: Response, next: NextFunction)
        : Promise<void> | undefined {
        try {
            const { error, value } = commentValidator.action.validate(req.body);

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

export const commentMiddleware = new CommentMiddleware();

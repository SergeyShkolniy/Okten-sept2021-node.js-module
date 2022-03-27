import { Request, Response } from 'express';

import { ICommentsEntity } from '../entity';
import { commentService } from '../services';

class CommentController {
    public async getAllCommentAuthorId(req : Request, res : Response):
        Promise<Response<ICommentsEntity [] >> {
        const { authorId } = req.params;
        const allCommentAuthorId = await commentService.getAllCommentAuthorId(+authorId);
        return res.status(200).json(allCommentAuthorId);
    }

    public async patchComment(req : Request, res : Response): Promise<Response<ICommentsEntity>> {
        const { commentId, action } = req.body;
        const patchUpdateComment = await commentService.patchComment(+commentId, action);
        return res.status(200).json(patchUpdateComment);
    }
}

export const commentController = new CommentController();

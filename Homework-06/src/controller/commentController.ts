import { Request, Response } from 'express';
import { ICommentsEntity } from '../entity/commentsEntity';
import { commentService } from '../services/comment.Service';

class CommentController {
    public async getAllCommentAuthorId(req : Request, res : Response):
        Promise<Response<ICommentsEntity [] >> {
        const { authorId } = req.params;
        const allCommentAuthorId = await commentService.getAllCommentAuthorId(+authorId);
        return res.status(200).json(allCommentAuthorId);
    }

    // public async patchComments(req : Request, res : Response):
    // Promise<Response<ICommentsEntity>>{
    //     const { action, commentId } = req.body;
    // }
}

export const commentController = new CommentController();

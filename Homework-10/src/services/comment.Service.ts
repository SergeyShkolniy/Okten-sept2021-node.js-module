import { UpdateResult } from 'typeorm';

import { ICommentsEntity } from '../entity';
import { commentRepository } from '../repositories';

class CommentService {
    public async getAllCommentAuthorId(authorId:number): Promise<ICommentsEntity [] > {
        const allCommentAuthorId = await commentRepository.getAllCommentsAuthorId(authorId);
        return allCommentAuthorId;
    }

    public async patchComment(commentId:number, action:string):
        Promise< undefined | UpdateResult | Error> {
        return commentRepository.patchComment(commentId, action);
    }
}

export const commentService = new CommentService();

import { ICommentsEntity } from '../entity/commentsEntity';
import { commentRepository } from '../repositories/comment/commentRepository';

class CommentService {
    public async getAllCommentAuthorId(authorId:number): Promise<ICommentsEntity [] > {
        const allCommentAuthorId = await commentRepository.getAllCommentsAuthorId(authorId);
        return allCommentAuthorId;
    }
}

export const commentService = new CommentService();

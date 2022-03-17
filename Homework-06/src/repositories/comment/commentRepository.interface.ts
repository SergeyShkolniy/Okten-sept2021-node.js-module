import { ICommentsEntity } from '../../entity/commentsEntity';

export interface ICommentRepository {
    getAllCommentsAuthorId(authorId:number): Promise<ICommentsEntity [] >
}

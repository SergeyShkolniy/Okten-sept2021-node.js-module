import { UpdateResult } from 'typeorm';
import { ICommentsEntity } from '../../entity/commentsEntity';

export interface ICommentRepository {
    getAllCommentsAuthorId(authorId:number): Promise<ICommentsEntity [] >,
    patchComment(commentId:number, action:string):
        Promise< undefined | UpdateResult | Error>
}

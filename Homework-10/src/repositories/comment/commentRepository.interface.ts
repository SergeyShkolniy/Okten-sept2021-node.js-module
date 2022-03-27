import { UpdateResult } from 'typeorm';

import { ICommentsEntity } from '../../entity';

export interface ICommentRepository {
    getAllCommentsAuthorId(authorId:number): Promise<ICommentsEntity [] >,
    patchComment(commentId:number, action:string):
        Promise< undefined | UpdateResult | Error>
}

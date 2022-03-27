import {
    EntityRepository, getManager, Repository, UpdateResult,
} from 'typeorm';

import { CommentsEntity, ICommentsEntity } from '../../entity';
import { ICommentRepository } from './commentRepository.interface';

@EntityRepository(CommentsEntity)
class CommentRepository extends Repository <CommentsEntity> implements ICommentRepository {
    public async getAllCommentsAuthorId(authorId:number): Promise<ICommentsEntity [] > {
        return getManager()
            .getRepository(CommentsEntity)
            .find({
                relations: ['post'],
                where: {
                    authorId: Number(authorId),
                },
            });
    }

    // eslint-disable-next-line consistent-return
    public async patchComment(commentId:number, action:string):
        Promise< undefined | UpdateResult | Error> {
        const comment = await getManager()
            .getRepository(CommentsEntity)
            .findOne({ id: Number(commentId) });

        if (action === 'like') {
            return getManager()
                .getRepository(CommentsEntity)
                .update({ id: Number(commentId) }, {
                    like: (() => `${comment?.like} + 1`),
                });
        }
        if (action === 'dislike') {
            return getManager()
                .getRepository(CommentsEntity)
                .update({ id: Number(commentId) }, {
                    dislike: (() => `${comment?.dislike} - 1`),
                });
        }
    }
}

export const commentRepository = new CommentRepository();

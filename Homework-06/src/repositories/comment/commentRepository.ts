import { EntityRepository, getManager, Repository } from 'typeorm';
import { CommentsEntity, ICommentsEntity } from '../../entity/commentsEntity';
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
}

export const commentRepository = new CommentRepository();

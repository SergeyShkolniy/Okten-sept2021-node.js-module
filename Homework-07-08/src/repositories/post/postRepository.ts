import {
    EntityRepository, getManager, Repository, UpdateResult,
} from 'typeorm';
import { IPostEntity, PostEntity } from '../../entity/postEntity';
import { IPostRepository } from './postRepository.interface';

@EntityRepository(PostEntity)
class PostRepository extends Repository<PostEntity> implements IPostRepository {
    public async getAllPostsUserId(userId:number): Promise<IPostEntity [] > {
        return getManager().getRepository(PostEntity).find({ userId });
    }

    public async patchPost(id:number, text: string): Promise<UpdateResult> {
        return getManager()
            .getRepository(PostEntity)
            .update({ id }, {
                text,
            });
    }
}

export const postRepository = new PostRepository();

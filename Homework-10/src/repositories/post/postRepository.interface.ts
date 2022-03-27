import { UpdateResult } from 'typeorm';

import { IPostEntity } from '../../entity';

export interface IPostRepository {
    getAllPostsUserId(userId:number): Promise<IPostEntity [] >,
    patchPost(id:number, text: string): Promise<UpdateResult>
}

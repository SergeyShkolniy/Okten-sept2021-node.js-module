import { UpdateResult } from 'typeorm';
import { IPostEntity } from '../entity/postEntity';
import { postRepository } from '../repositories/post/postRepository';

class PostService {
    public async getAllPostsUserId(userId:number): Promise<IPostEntity [] > {
        const allPostsUserId = await postRepository.getAllPostsUserId(userId);
        return allPostsUserId;
    }

    public async patchPost(id:number, text: string): Promise<UpdateResult> {
        return postRepository.patchPost(id, text);
    }
}

export const postService = new PostService();

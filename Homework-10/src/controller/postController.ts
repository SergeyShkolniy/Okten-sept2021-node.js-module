import { Request, Response } from 'express';
import { IPostEntity } from '../entity/postEntity';
import { postService } from '../services/postService';

class PostController {
    public async getAllPostsUserId(req : Request, res : Response):
        Promise<Response<IPostEntity [] >> {
        const { userId } = req.params;
        const allPostsUserId = await postService.getAllPostsUserId(+userId);
        return res.status(200).json(allPostsUserId);
    }

    public async patchPost(req : Request, res : Response): Promise<Response<IPostEntity>> {
        const { text } = req.body;
        const { id } = req.params;
        const patchUpdatePost = await postService.patchPost(+id, text);
        return res.status(200).json(patchUpdatePost);
    }
}

export const postController = new PostController();

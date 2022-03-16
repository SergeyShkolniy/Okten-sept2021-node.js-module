import { Request, Response } from 'express';
import { IUserEntity } from '../entity/userEntity';
import { userService } from '../services/userService';

class UserController {
    public async createUser(req : Request, res : Response): Promise<Response<IUserEntity>> {
        const createdUser = await userService.createUser(req.body);
        return res.json(createdUser);
    }
}

export const userController = new UserController();

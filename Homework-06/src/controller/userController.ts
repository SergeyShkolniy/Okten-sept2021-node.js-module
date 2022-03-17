import { Request, Response } from 'express';
import { IUserEntity } from '../entity/userEntity';
import { userService } from '../services/userService';

class UserController {
    public async createUser(req : Request, res : Response): Promise<Response<IUserEntity>> {
        const createdUser = await userService.createUser(req.body);
        return res.status(201).json(createdUser);
    }

    public async getAllUsers(req : Request, res : Response): Promise<Response<IUserEntity[]>> {
        const allUsers = await userService.getAllUsers();
        return res.status(200).json(allUsers);
    }

    public async patchUser(req : Request, res : Response): Promise<Response<IUserEntity>> {
        const { password, email } = req.body;
        const { id } = req.params;
        const patchUpdateUser = await userService.patchUser(+id, password, email);
        return res.status(200).json(patchUpdateUser);
    }

    public async deleteUser(req : Request, res : Response): Promise<void> {
        const { id } = req.params;
        await userService.deleteUser(+id);
        res.status(200).send('user deleted');
    }
}

export const userController = new UserController();

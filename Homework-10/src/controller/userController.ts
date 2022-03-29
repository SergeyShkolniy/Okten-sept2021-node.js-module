import { Request, Response } from 'express';

import { IUserEntity } from '../entity';
import { emailService, userService } from '../services';
import { ITokenData } from '../interface';
import { emailActionEnum } from '../email';
import { COOKIE } from '../constants';

class UserController {
    public async createUser(req: Request, res: Response): Promise<Response<ITokenData>> {
        // const data = await authService.registration(req.body);
        const data = await userService.createUser(req.body);
        await emailService.sendMail(req.body.email, emailActionEnum.REGISTRATION);
        res.cookie(
            COOKIE.nameRefreshToken,
            data.refreshToken,
            { maxAge: COOKIE.maxAgeRefreshToken, httpOnly: true },
        );
        return res.json(data);
    }

    public async getAllUsers(req : Request, res : Response): Promise<Response<IUserEntity[]>> {
        const allUsers = await userService.getAllUsers();
        return res.status(200).json(allUsers);
    }

    public async getUserByEmail(req : Request, res : Response): Promise<Response<IUserEntity>> {
        const { email } = req.params;
        const userByEmail = await userService.getUserByEmail(email);
        return res.status(200).json(userByEmail);
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

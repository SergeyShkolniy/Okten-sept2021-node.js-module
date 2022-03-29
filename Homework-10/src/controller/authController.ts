import { Response } from 'express';

import { emailService, tokenService, userService } from '../services';
import { IRequestExtended } from '../interface';
import { IUserEntity } from '../entity';
import { tokenRepository } from '../repositories';
import { emailActionEnum } from '../email';

class AuthController {
    public async login(req:IRequestExtended, res: Response) {
        try {
            const { id, email, password: hashPassword } = req.user as IUserEntity;
            const { password } = req.body;

            await emailService.sendMail(email, emailActionEnum.LOGIN);
            await userService.compareUserPasswords(password, hashPassword);
            const { refreshToken, accessToken } = tokenService
                .generateTokenPair({ userId: id, userEmail: email });
            await tokenRepository.createToken({ refreshToken, accessToken, userId: id });

            res.json({
                refreshToken,
                accessToken,
                user: req.user,
            });
        } catch (e:any) {
            res.status(400).json(e.message);
        }
    }

    public async logout(req: IRequestExtended, res: Response): Promise<Response<string>> {
        const { id, email } = req.user as IUserEntity;
        await emailService.sendMail(email, emailActionEnum.LOGOUT);
        await tokenService.deleteUserTokenPair(id);

        return res.json('Ok');
    }

    public async refresh(req:IRequestExtended, res: Response): Promise<void | Error> {
        try {
            const { id, email } = req.user as IUserEntity;
            const refreshTokenToDelete = req.get('Authorization');
            await tokenService.deleteTokenPairByParams({ refreshToken: refreshTokenToDelete });
            const { accessToken, refreshToken } = await tokenService
                .generateTokenPair({ userId: id, userEmail: email });
            await tokenRepository.createToken({ refreshToken, accessToken, userId: id });

            res.json({
                refreshToken,
                accessToken,
                user: req.user,
            });
        } catch (e:any) {
            res.status(400).json(e.message);
        }
    }
}

export const authController = new AuthController();

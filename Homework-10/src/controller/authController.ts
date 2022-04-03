import { NextFunction, Response } from 'express';

import { emailService, tokenService, userService } from '../services';
import { IRequestExtended } from '../interface';
import { IUserEntity } from '../entity';
import { tokenRepository } from '../repositories';
import { EmailActionEnum } from '../email';
import { actionTokenRepository } from '../repositories/actionToken/actionTokenRepository';
import { ActionTokenTypes } from '../enum/actionTokenTypesEnum';
import { constants } from '../constants';

class AuthController {
    public async login(req:IRequestExtended, res: Response) {
        try {
            const { id, email, password: hashPassword } = req.user as IUserEntity;
            const { password } = req.body;
            await userService.compareUserPasswords(password, hashPassword);
            const { refreshToken, accessToken } = tokenService
                .generateTokenPair({ userId: id, userEmail: email });
            await tokenRepository.createToken({ refreshToken, accessToken, userId: id });
            await emailService.sendMail(email, EmailActionEnum.LOGIN);

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
        await emailService.sendMail(email, EmailActionEnum.LOGOUT);
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

    public async sendForgotPassword(req:IRequestExtended, res: Response) {
        try {
            const { id, email, firstName } = req.user as IUserEntity;
            const actionToken = tokenService
                .generateActionToken({ userId: id, userEmail: email });
            await actionTokenRepository.createActionToken({
                actionToken,
                type: ActionTokenTypes.ForgotPassword,
                userId: id,
            });

            await emailService.sendMail(email, EmailActionEnum.FORGOT_PASSWORD, {
                firstName,
                frontendUrl: `${constants.FRONTEND_URL_FORGOT_PASSWORD}?token=${actionToken}`,
            });
            res.status(400).json({ actionToken });
        } catch (e:any) {
            res.status(400).json(e.message);
        }
    }

    public async setPassword(req:IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { id } = req.user as IUserEntity;
            const { password } = req.body;
            const actionToken = req.get(constants.AUTHORIZATION);

            await userService.patchUserPassword(+id, password);
            await actionTokenRepository.deleteByParams({ actionToken });

            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    }
}

export const authController = new AuthController();

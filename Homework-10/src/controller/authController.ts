import { Request, Response } from 'express';

import { authService, userService, tokenService } from '../services';
import { IRequestExtended, ITokenData } from '../interface';
import { COOKIE } from '../constants';
import { IUserEntity } from '../entity';
import { tokenRepository } from '../repositories';

class AuthController {
    public async registration(req: Request, res: Response): Promise<Response<ITokenData>> {
        const data = await authService.registration(req.body);
        res.cookie(
            COOKIE.nameRefreshToken,
            data.refreshToken,
            { maxAge: COOKIE.maxAgeRefreshToken, httpOnly: true },
        );
        return res.json(data);
    }

    public async login(req:IRequestExtended, res: Response) {
        try {
            const { id, email, password: hashPassword } = req.user as IUserEntity;
            const { password } = req.body;
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
        const { id } = req.user as IUserEntity;

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

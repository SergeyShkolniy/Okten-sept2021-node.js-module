import { Request, Response } from 'express';
import { authService } from '../services/authService';
import { ITokenData } from '../interface';
import { COOKIE } from '../constants';

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
}

export const authController = new AuthController();

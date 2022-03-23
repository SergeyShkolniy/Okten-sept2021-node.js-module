import jwt from 'jsonwebtoken';
import { config } from '../config';
import { ITokenEntity } from '../entity/tokenEntity';
import { tokenRepository } from '../repositories/token/tokenRepository';
import { ITokenPair, IUserPayload } from '../interface';

class TokenService {
    public generateTokenPair(payload:IUserPayload): ITokenPair {
        const accessToken = jwt.sign(payload, config.SECRET_ACCESS_KEY as string, { expiresIn: '15m' });
        const refreshToken = jwt.sign(payload, config.SECRET_REFRESH_KEY as string, { expiresIn: '1d' });

        return {
            accessToken,
            refreshToken,
        };
    }

    public async saveToken(userId:number, refreshToken:string, accessToken:string):
        Promise<ITokenEntity> {
        const tokenFromDb = await tokenRepository.findTokenByUserId(userId);
        if (tokenFromDb) {
            tokenFromDb.refreshToken = refreshToken;
            tokenFromDb.accessToken = accessToken;
            return tokenRepository.createToken(tokenFromDb);
        }
        return tokenRepository.createToken({ userId, refreshToken, accessToken });
    }
}

export const tokenService = new TokenService();
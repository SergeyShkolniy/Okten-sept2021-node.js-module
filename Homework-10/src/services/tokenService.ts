import jwt from 'jsonwebtoken';

import { config } from '../config';
import { ITokenEntity } from '../entity';
import { tokenRepository } from '../repositories';
import { ITokenPair, IUserPayload } from '../interface';

class TokenService {
    public generateTokenPair(payload:IUserPayload): ITokenPair {
        const accessToken = jwt.sign(payload, config.SECRET_ACCESS_KEY as string, { expiresIn: '1d' });
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

    verifyToken(authToken: string, tokenType = 'access'): IUserPayload {
        let secretWord = config.SECRET_ACCESS_KEY;
        if (tokenType === 'refresh') {
            secretWord = config.SECRET_REFRESH_KEY;
        }
        if (tokenType === 'action') {
            secretWord = config.SECRET_ACTION_TOKEN_KEY;
        }
        return jwt.verify(authToken, secretWord as string) as IUserPayload;
    }

    public async deleteTokenPairByParams(searchObject: Partial<ITokenEntity>) {
        return tokenRepository.deleteByParams(searchObject);
    }

    public async deleteUserTokenPair(userId: number) {
        return tokenRepository.deleteByParams({ userId });
    }

    public generateActionToken(payload:IUserPayload): string {
        return jwt.sign(payload, config.SECRET_ACTION_TOKEN_KEY as string, { expiresIn: '1d' });
    }
}

export const tokenService = new TokenService();

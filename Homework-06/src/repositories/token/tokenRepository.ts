import { getManager } from 'typeorm';
import { ITokenEntity, TokenEntity } from '../../entity/tokenEntity';

class TokenRepository {
    public async createToken(token: any):Promise<ITokenEntity> {
        return getManager().getRepository(TokenEntity).save(token);
    }

    public async findTokenByUserId(userId: number): Promise<ITokenEntity | undefined> {
        return getManager().getRepository(TokenEntity).findOne({ userId });
    }
}

export const tokenRepository = new TokenRepository();

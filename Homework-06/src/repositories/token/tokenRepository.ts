import { EntityRepository, getManager, Repository } from 'typeorm';
import { ITokenEntity, TokenEntity } from '../../entity/tokenEntity';
import { ITokenRepository } from './tokenRepository.interface';
import { ITokenDataToSave } from '../../interface';

@EntityRepository(TokenEntity)
class TokenRepository extends Repository<TokenEntity> implements ITokenRepository {
    public async createToken(token: ITokenDataToSave):Promise<ITokenEntity> {
        return getManager().getRepository(TokenEntity).save(token);
    }

    public async findTokenByUserId(userId: number): Promise<ITokenEntity | undefined> {
        return getManager().getRepository(TokenEntity).findOne({ userId });
    }
}

export const tokenRepository = new TokenRepository();

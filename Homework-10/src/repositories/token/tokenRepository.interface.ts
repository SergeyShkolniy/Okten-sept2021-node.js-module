import { DeleteResult } from 'typeorm';

import { ITokenEntity, TokenEntity } from '../../entity';
import { ITokenDataToSave } from '../../interface';

export interface ITokenRepository {
    createToken(token: ITokenDataToSave): Promise<ITokenEntity>;
    findTokenByUserId(userId: number): Promise<ITokenEntity | undefined>;
    findByParams(filterObject: Partial<ITokenEntity>)
        : Promise<TokenEntity | undefined>;
    deleteByParams(findObject: Partial<ITokenEntity>): Promise<DeleteResult>;
}

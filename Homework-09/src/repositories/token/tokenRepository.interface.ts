import { ITokenEntity } from '../../entity/tokenEntity';
import { ITokenDataToSave } from '../../interface';

export interface ITokenRepository {
    createToken(token: ITokenDataToSave): Promise<ITokenEntity>;
    findTokenByUserId(userId: number): Promise<ITokenEntity | undefined>;
}

import { DeleteResult } from 'typeorm';
import { ActionTokenEntity, IActionTokenEntity } from '../../entity/actionTokenEntity';

export interface IActionTokenRepository {
    createActionToken(token: IActionTokenEntity): Promise<ActionTokenEntity>;
    findByParams(filterObject: Partial<IActionTokenEntity>)
        : Promise<ActionTokenEntity | undefined>;
    deleteByParams(findObject: Partial<IActionTokenEntity>): Promise<DeleteResult>
}

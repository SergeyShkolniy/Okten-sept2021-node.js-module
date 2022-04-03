import {
    DeleteResult,
    EntityRepository, getManager, Repository,
} from 'typeorm';

import { ActionTokenEntity, IActionTokenEntity } from '../../entity/actionTokenEntity';
import { IActionTokenRepository } from './actionTokenRepository.interface';

@EntityRepository(ActionTokenEntity)
class ActionTokenRepository extends Repository<ActionTokenEntity>
    implements IActionTokenRepository {
    public async createActionToken(token: IActionTokenEntity): Promise<ActionTokenEntity> {
        return getManager().getRepository(ActionTokenEntity).save(token);
    }

    public async findByParams(filterObject: Partial<IActionTokenEntity>)
        : Promise<ActionTokenEntity | undefined> {
        return getManager().getRepository(ActionTokenEntity).findOne(filterObject);
    }

    public async deleteByParams(findObject: Partial<IActionTokenEntity>): Promise<DeleteResult> {
        return getManager().getRepository(ActionTokenEntity).delete(findObject);
    }
}

export const actionTokenRepository = new ActionTokenRepository();

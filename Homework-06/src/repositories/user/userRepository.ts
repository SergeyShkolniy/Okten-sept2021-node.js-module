import { EntityRepository, getManager, Repository } from 'typeorm';
import { IUserEntity, UserEntity } from '../../entity/userEntity';
import { IUserRepository } from './userRepository.interface';

@EntityRepository(UserEntity)
class UserRepository extends Repository<UserEntity> implements IUserRepository {
    public async createUser(user: IUserEntity): Promise<IUserEntity> {
        return getManager().getRepository(UserEntity).save(user);
    }
}

export const userRepository = new UserRepository();

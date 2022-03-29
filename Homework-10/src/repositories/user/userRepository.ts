import {
    EntityRepository, getManager, Repository, UpdateResult,
} from 'typeorm';
import { IUserEntity, UserEntity } from '../../entity';
import { IUserRepository } from './userRepository.interface';

@EntityRepository(UserEntity)
class UserRepository extends Repository<UserEntity> implements IUserRepository {
    public async createUser(user: IUserEntity): Promise<IUserEntity> {
        return getManager().getRepository(UserEntity).save(user);
    }

    public async getAllUsers():Promise<IUserEntity []> {
        return getManager().getRepository(UserEntity).find({ relations: ['posts', 'comments'] });
    }

    public async getUserByEmail(email:string):Promise<IUserEntity | undefined> {
        return getManager()
            .getRepository(UserEntity)
            .findOne({ email });
    }

    public async getUserByEmailOrPhone(email: string, phone: string)
        :Promise<IUserEntity | undefined> {
        return getManager()
            .getRepository(UserEntity)
            .findOne({ email, phone });
    }

    public async patchUser(id:number, password:string, email:string): Promise<UpdateResult> {
        return getManager()
            .getRepository(UserEntity)
            .update({ id }, {
                password,
                email,
            });
    }

    public async deleteUser(id:number): Promise<UpdateResult> {
        return getManager()
            .getRepository(UserEntity)
            .softDelete({ id });
    }
}

export const userRepository = new UserRepository();

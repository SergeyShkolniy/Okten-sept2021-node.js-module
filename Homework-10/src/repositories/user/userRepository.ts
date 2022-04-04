import {
    EntityRepository, getManager, LessThanOrEqual, Repository, UpdateResult,
} from 'typeorm';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { IUserEntity, UserEntity } from '../../entity';
import { IUserRepository } from './userRepository.interface';

dayjs.extend(utc);

@EntityRepository(UserEntity)
class UserRepository extends Repository<UserEntity> implements IUserRepository {
    public async createUser(user: IUserEntity): Promise<IUserEntity> {
        return getManager().getRepository(UserEntity).save(user);
    }

    public async getAllUsers():Promise<IUserEntity []> {
        return getManager().getRepository(UserEntity).find({ relations: ['posts', 'comments'] });
    }

    public async sendEmailAllUsers():Promise<IUserEntity []> {
        return getManager().getRepository(UserEntity).find({
            relations: ['posts', 'comments'],
            where: {
                createdAt: LessThanOrEqual(`${dayjs().utc().startOf('minute').format()}`),
            },
        });
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

    public async patchUser(id:number, firstName:string, lastName:string)
        : Promise<UpdateResult> {
        return getManager()
            .getRepository(UserEntity)
            .update({ id }, {
                firstName,
                lastName,
            });
    }

    public async patchUserPassword(id:number, password:string): Promise<UpdateResult> {
        return getManager()
            .getRepository(UserEntity)
            .update({ id }, {
                password,
            });
    }

    public async deleteUser(id:number): Promise<UpdateResult> {
        return getManager()
            .getRepository(UserEntity)
            .softDelete({ id });
    }
}

export const userRepository = new UserRepository();

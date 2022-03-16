import { IUserEntity } from '../../entity/userEntity';

export interface IUserRepository {
    createUser(user: IUserEntity): Promise<IUserEntity>
}

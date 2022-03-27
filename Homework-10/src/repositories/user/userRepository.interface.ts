import { UpdateResult } from 'typeorm';

import { IUserEntity } from '../../entity';

export interface IUserRepository {
    createUser(user: IUserEntity): Promise<IUserEntity>,
    getAllUsers():Promise<IUserEntity []>,
    getUserByEmail(email:string):Promise<IUserEntity | undefined>,
    patchUser(id:number, password:string, email:string): Promise<UpdateResult>,
    deleteUser(id:number): Promise<UpdateResult>,
}

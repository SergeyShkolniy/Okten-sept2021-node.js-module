import { UpdateResult } from 'typeorm';
import { IUserEntity } from '../../entity/userEntity';

export interface IUserRepository {
    createUser(user: IUserEntity): Promise<IUserEntity>,
    getAllUsers():Promise<IUserEntity []>,
    patchUser(id:number, password:string, email:string): Promise<UpdateResult>,
    deleteUser(id:number): Promise<UpdateResult>
}

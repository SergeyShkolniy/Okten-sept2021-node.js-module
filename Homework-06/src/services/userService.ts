import { UpdateResult } from 'typeorm';
import { IUserEntity } from '../entity/userEntity';
import { userRepository } from '../repositories/user/userRepository';

class UserService {
    public async createUser(user: IUserEntity): Promise<IUserEntity> {
        const createdUser = await userRepository.createUser(user);
        return createdUser;
    }

    public async getAllUsers(): Promise<IUserEntity []> {
        const allUsers = await userRepository.getAllUsers();
        return allUsers;
    }

    public async patchUser(id:number, password:string, email:string): Promise<UpdateResult> {
        return userRepository.patchUser(id, password, email);
    }

    public async deleteUser(id:number): Promise<void> {
        await userRepository.deleteUser(id);
    }
}

export const userService = new UserService();

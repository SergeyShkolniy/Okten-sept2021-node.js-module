import { UpdateResult } from 'typeorm';
import bcrypt from 'bcrypt';

import { IUserEntity } from '../entity';
import { userRepository } from '../repositories';

class UserService {
    public async createUser(user: IUserEntity): Promise<IUserEntity> {
        const { password } = user;

        const hashedPassword = await this._hashPassword(password);
        const dataToSave = { ...user, password: hashedPassword };

        const createdUser = await userRepository.createUser(dataToSave);
        return createdUser;
    }

    public async getAllUsers(): Promise<IUserEntity []> {
        const allUsers = await userRepository.getAllUsers();
        return allUsers;
    }

    public async getUserByEmail(email:string):Promise<IUserEntity | undefined> {
        const userByEmail = await userRepository.getUserByEmail(email);
        return userByEmail;
    }

    public async patchUser(id:number, password:string, email:string): Promise<UpdateResult> {
        return userRepository.patchUser(id, password, email);
    }

    public async deleteUser(id:number): Promise<void> {
        await userRepository.deleteUser(id);
    }

    public async compareUserPasswords(password: string, hash: string): Promise<void | Error> {
        const isPasswordUnique = await bcrypt.compare(password, hash);

        if (!isPasswordUnique) {
            throw new Error('wrong email or password');
        }
    }

    private async _hashPassword(password:string): Promise<string> {
        return bcrypt.hash(password, 10);
    }
}

export const userService = new UserService();

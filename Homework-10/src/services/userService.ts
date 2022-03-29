import { UpdateResult } from 'typeorm';
import bcrypt from 'bcrypt';

import { IUserEntity } from '../entity';
import { userRepository } from '../repositories';
import { ITokenData } from '../interface';
import { tokenService } from './tokenService';

class UserService {
    public async createUser(user: IUserEntity): Promise<ITokenData> {
        const { password } = user;

        const hashedPassword = await this._hashPassword(password);
        const dataToSave = { ...user, password: hashedPassword };

        const createdUser = await userRepository.createUser(dataToSave);
        // return createdUser;
        return this._getTokenData(createdUser);
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

    private async _getTokenData(userData: IUserEntity): Promise<ITokenData> {
        const { id, email } = userData;
        const { refreshToken, accessToken } = await tokenService
            .generateTokenPair({ userId: id, userEmail: email });
        await tokenService.saveToken(id, refreshToken, accessToken);

        return {
            refreshToken,
            accessToken,
            userId: id,
            userEmail: email,
        };
    }
}

export const userService = new UserService();

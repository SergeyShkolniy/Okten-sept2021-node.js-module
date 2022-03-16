import { IUserEntity } from '../entity/userEntity';
import { userRepository } from '../repositories/user/userRepository';

class UserService {
    public async createUser(user: IUserEntity): Promise<IUserEntity> {
        const createdUser = await userRepository.createUser(user);
        return createdUser;
    }
}

export const userService = new UserService();

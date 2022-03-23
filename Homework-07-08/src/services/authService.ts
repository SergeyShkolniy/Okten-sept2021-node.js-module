import { userService } from './userService';
import { IUserEntity } from '../entity/userEntity';
import { tokenService } from './tokenService';
import { ITokenData } from '../interface';

class AuthService {
    public async registration(body: IUserEntity): Promise<ITokenData> {
        const { email } = body;

        const userFromDb = await userService.getUserByEmail(email);
        if (userFromDb) {
            throw new Error(`User with email: ${email} already exists`);
        }
        const createdUser = await userService.createUser(body);
        return this._getTokenData(createdUser);
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

export const authService = new AuthService();

import { Request } from 'express';
import { IUserEntity } from '../entity/userEntity';

export interface IRequestExtended extends Request {
    user?: IUserEntity;
    tokenType?: string;
}

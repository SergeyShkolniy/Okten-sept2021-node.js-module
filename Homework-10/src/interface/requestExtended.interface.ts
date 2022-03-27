import { Request } from 'express';

import { IUserEntity } from '../entity';

export interface IRequestExtended extends Request {
    user?: IUserEntity;
    tokenType?: string;
}

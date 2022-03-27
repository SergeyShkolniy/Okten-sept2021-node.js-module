import {
    Column, Entity, JoinColumn, OneToOne,
} from 'typeorm';

import { CommonFieldsEntity } from './commonFieldsEntity';
import { UserEntity } from './userEntity';

export interface ITokenEntity {
    userId: number;
    refreshToken: string;
    accessToken: string;
}

@Entity('Tokens', { database: 'okten' })
export class TokenEntity extends CommonFieldsEntity implements ITokenEntity {
    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        refreshToken: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        accessToken: string;

    @Column({
        type: 'int',
    })
        userId: number;

    @OneToOne(() => UserEntity)
    @JoinColumn({ name: 'userId' })
        user: UserEntity;
}

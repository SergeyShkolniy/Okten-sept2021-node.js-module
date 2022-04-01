import {
    Column, Entity, JoinColumn, OneToOne,
} from 'typeorm';

import { CommonFieldsEntity } from './commonFieldsEntity';
import { UserEntity } from './userEntity';

export interface IActionTokenEntity {
    userId: number;
    actionToken: string;
    type: string;
}

@Entity('actionTokens', { database: 'okten' })
export class ActionTokenEntity extends CommonFieldsEntity implements IActionTokenEntity {
    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        actionToken: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        type: string;

    @Column({
        type: 'int',
    })
        userId: number;

    @OneToOne(() => UserEntity)
    @JoinColumn({ name: 'userId' })
        user: UserEntity;
}

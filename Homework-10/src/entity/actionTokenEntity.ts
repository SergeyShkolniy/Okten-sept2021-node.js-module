import {
    Column, Entity, JoinColumn, OneToOne,
} from 'typeorm';

import { CommonFieldsEntity } from './commonFieldsEntity';
import { UserEntity } from './userEntity';
import { ActionTokenTypes } from '../enum/actionTokenTypesEnum';

export interface IActionTokenEntity {
    userId: number;
    actionToken: string;
    type: ActionTokenTypes;
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
        type: ActionTokenTypes;

    @Column({
        type: 'int',
    })
        userId: number;

    @OneToOne(() => UserEntity)
    @JoinColumn({ name: 'userId' })
        user: UserEntity;
}

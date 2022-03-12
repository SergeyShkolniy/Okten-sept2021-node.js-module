import { Column, Entity } from 'typeorm';
import { CommonFieldsEntity } from './commonFieldsEntity';

export interface IUserEntity {
    firstName: string;
    lastName: string;
    age?: number;
    phone: string;
    email: string;
    password: string;
}

@Entity('Users', { database: 'okten' })
export class UserEntity extends CommonFieldsEntity implements IUserEntity {
    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        firstName:string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        lastName:string;

    @Column({
        type: 'int',
    })
        age?:number;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
        unique: true,
    })
        phone:string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
        unique: true,
    })
        email:string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        password:string;
}

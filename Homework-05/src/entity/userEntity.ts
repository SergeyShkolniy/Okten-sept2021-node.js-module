import { Column, Entity, OneToMany } from 'typeorm';
import { CommonFieldsEntity } from './commonFieldsEntity';
import { PostEntity } from './postEntity';
import { CommentsEntity } from './commentsEntity';

export interface IUserEntity {
    firstName: string;
    lastName: string;
    age?: number;
    phone: string;
    email: string;
    password: string;
    posts: any[];
    comments: any[];
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

    @OneToMany(() => PostEntity, (post) => post.user)
        posts: PostEntity[];

    @OneToMany(() => CommentsEntity, (comment) => comment.user)
        comments: CommentsEntity[];
}

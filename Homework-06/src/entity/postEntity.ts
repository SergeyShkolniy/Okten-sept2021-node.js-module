import {
    Column, Entity, ManyToOne, JoinColumn, OneToMany,
} from 'typeorm';
import { CommonFieldsEntity } from './commonFieldsEntity';
import { UserEntity } from './userEntity';
import { CommentsEntity } from './commentsEntity';

export interface IPostEntity {
    title: string;
    text: string;
    userId: number;
}

@Entity('Posts', { database: 'okten' })
export class PostEntity extends CommonFieldsEntity implements IPostEntity {
    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        title:string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        text:string;

    @Column({
        type: 'int',
    })
        userId:number;

    @ManyToOne(() => UserEntity, (user) => user.posts)
    @JoinColumn({ name: 'userId' })
        user: UserEntity;

    @OneToMany(() => CommentsEntity, (comment) => comment.post)
        comments: CommentsEntity[];
}

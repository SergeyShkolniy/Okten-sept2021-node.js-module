import {
    Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';

import { CommonFieldsEntity } from './commonFieldsEntity';
import { UserEntity } from './userEntity';
import { PostEntity } from './postEntity';

export interface ICommentsEntity {
    text: string;
    authorId: number;
    postId: number;
    like: number;
    dislike: number;

}

@Entity('Comments', { database: 'okten' })
export class CommentsEntity extends CommonFieldsEntity implements ICommentsEntity {
    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        text:string;

    @Column({
        type: 'int',
    })
        authorId:number;

    @Column({
        type: 'int',
    })
        postId:number;

    @Column({
        type: 'int',
    })
        like: number;

    @Column({
        type: 'int',
    })
        dislike: number;

    @ManyToOne(() => UserEntity, (user) => user.comments)
    @JoinColumn({ name: 'authorId' })
        user: UserEntity;

    @ManyToOne(() => PostEntity, (post) => post.comments)
    @JoinColumn({ name: 'postId' })
        post: PostEntity;
}

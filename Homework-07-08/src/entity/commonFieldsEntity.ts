import {
    Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn,
} from 'typeorm';

export interface ICommonFieldsEntity {
    id: number;
    createdAt: string;
    deletedAt?: string;
}

export class CommonFieldsEntity implements ICommonFieldsEntity {
    @PrimaryGeneratedColumn()
        id:number;

    @Column({
        nullable: false,
        default: Date.now(),
    })
    @CreateDateColumn({ type: 'timestamp' })
        createdAt: string;

    @Column()
    @DeleteDateColumn({ type: 'timestamp' })
        deletedAt: string;
}

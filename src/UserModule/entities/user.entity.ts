import {
    Entity,
    ObjectID,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
    Index,
} from "typeorm";

import Blog from './../../BlogModule/entities/blog.entity';

@Entity()
export default class User {

    @PrimaryGeneratedColumn()
    id: ObjectID;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    @Index({
        unique: true,
    })
    email: string;

    @Column({
        select: false,
    })
    password: string;

    @OneToMany(type => Blog, blog => blog.user)
    blogs: Blog[];

    @Column({
        default: 1,
    })
    active: boolean;

    @CreateDateColumn()
    created;

    @UpdateDateColumn()
    updated;

}

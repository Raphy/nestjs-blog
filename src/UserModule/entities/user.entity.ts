import {
    Entity,
    ObjectID,
    ObjectIdColumn,
    Column,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
    Index,
} from "typeorm";

import Blog from './../../BlogModule/entities/blog.entity';

@Entity()
export default class User {

    @ObjectIdColumn()
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

    // @OneToMany(type => Blog, blog => blog.user)
    // blogs: Blog[];

    @Column({
        type: 'boolean',
    })
    active: boolean;

    @CreateDateColumn()
    created;

    @UpdateDateColumn()
    updated;

}
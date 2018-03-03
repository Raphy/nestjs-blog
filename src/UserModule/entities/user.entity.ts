import {
    Entity,
    ObjectID,
    ObjectIdColumn,
    Column,
    JoinTable,
    ManyToMany,
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

    @ManyToMany(type => Blog)
    @JoinTable()
    roles: Blog[];

    @Column({
        type: 'boolean',
    })
    active: boolean;

    @CreateDateColumn()
    created;

    @UpdateDateColumn()
    updated;

}
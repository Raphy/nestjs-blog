import {
    Entity,
    ObjectID,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    Index,
    ManyToOne,
} from "typeorm";

import {
    UserEntity as User,
} from './../../UserModule/entities';

@Entity()
export default class Blog {

    @PrimaryGeneratedColumn()
    id: ObjectID;

    @Column()
    @Index({
        unique: true,
    })
    slug: string;

    @Column()
    title: string;

    @Column()
    body: string;

    @Column("datetime", {
        'default': null,
    })
    publish;
    //
    // @Column()
    // status;

    @ManyToOne(type => User, user => user.blogs)
    user: User;

    @CreateDateColumn()
    created;

    @UpdateDateColumn()
    updated;
}

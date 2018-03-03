import {
    Entity,
    ObjectID,
    ObjectIdColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    Index,
} from "typeorm";

@Entity()
export default class Blog {

    @ObjectIdColumn()
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

    @Column()
    publish = null;

    @Column()
    status;

    @CreateDateColumn()
    created;

    @UpdateDateColumn()
    updated;
}
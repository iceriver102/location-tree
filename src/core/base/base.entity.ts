import { BaseEntity as TypeormEntity, CreateDateColumn, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import type { EntityId } from 'typeorm/repository/EntityId';
import { Expose } from 'class-transformer';
import * as moment from 'moment';

export class BaseEntity extends TypeormEntity {

    @PrimaryGeneratedColumn('uuid')
    @Expose()
    id: EntityId;

    @CreateDateColumn()
    createTime: Date;

    @BeforeInsert()
    insertCreated() {
        this.createTime = new Date(
            moment().utc().format("YYYY-MM-DD HH:mm:ss")
        );
    }
}

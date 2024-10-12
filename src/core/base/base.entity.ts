import { BaseEntity as TypeormEntity, CreateDateColumn, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import type { EntityId } from 'typeorm/repository/EntityId';
import { Expose } from 'class-transformer';

export class BaseEntity extends TypeormEntity {

    @PrimaryGeneratedColumn("uuid")
    @Expose()
    id: EntityId;

    @CreateDateColumn()
    createTime: Date;


}

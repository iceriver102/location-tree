import { BaseEntity as TypeormEntity, CreateDateColumn, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import type { EntityId } from 'typeorm/repository/EntityId';
import { Expose } from 'class-transformer';

export class BaseEntity extends TypeormEntity {

    @PrimaryGeneratedColumn()
    @Expose()
    id: EntityId;

    @CreateDateColumn({ default: "CURRENT_TIMESTAMP" })
    createTime: Date;


}

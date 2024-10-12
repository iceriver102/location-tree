import { Expose } from 'class-transformer';
import {
    Entity,
    Column,
    Tree,
    TreeChildren,
    TreeParent,
    ManyToOne,
    BeforeInsert,
    JoinColumn
} from 'typeorm';
import { BaseEntity } from '~core/base/base.entity';
import { User } from '~modules/users/user.entity';
import { v4 } from "uuid"

@Entity({ name: 'tbl_locations' })
@Tree('closure-table', { closureTableName: "tbl_locations", ancestorColumnName: (c) => `ancestor_${c.propertyName}`, descendantColumnName: (c) => `descendant_${c.propertyName}` })

export class Location extends BaseEntity {

    @Column()
    @Expose()
    name: string;

    @Column()
    @Expose()
    locationNumber: string;


    @Column()
    @Expose()
    locationArea: number;

    @Column()
    @Expose()
    locationBuilding?: string;

    @Column()
    @Expose()
    level: string;

    @TreeChildren()
    @Expose()
    children?: Location[];

    @TreeParent()
    @Expose()
    parent?: Location;

    @Expose({toPlainOnly: true})
    @ManyToOne(() => User, (u) => u.locations)
    createBy?: User;

}

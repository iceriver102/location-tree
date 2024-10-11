import {
  Entity,
  Column
} from 'typeorm';
import { BaseEntity } from '~core/base/base.entity';

@Entity({ name: 'tbl_users' })
export class User extends BaseEntity {
  
  @Column()
  email: string;

  @Column()
  password: string;

}

import { Expose } from 'class-transformer';
import {
  Entity,
  Column,
  OneToMany
} from 'typeorm';
import { BaseEntity } from '~core/base/base.entity';
import { Location } from '~modules/locations/location.entity';

@Entity({ name: 'tbl_users' })
export class User extends BaseEntity {

  @Expose()
  @Column()
  email: string;
  
  @Column()
  password: string;

  @Expose()
  @OneToMany(()=>Location, (l)=>l.createBy)
  locations?: Location[]

}

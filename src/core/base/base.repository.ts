import { Repository, TreeRepository } from 'typeorm';
import { BaseEntity } from './base.entity';

export class BaseRepository<T extends BaseEntity> extends Repository<T> {
  public createQueryRunner() {
    return this.manager.connection.createQueryRunner();
  }
}

export class BaseTreeRepository<T extends BaseEntity> extends TreeRepository<T> {
  
}

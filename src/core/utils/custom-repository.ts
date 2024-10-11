import { Provider, Type } from '@nestjs/common';
import { getDataSourceToken, getRepositoryToken } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions, Repository } from 'typeorm';
import { BaseEntity } from '~core/base/base.entity';
import { BaseRepository } from '~core/base/base.repository';

export function provideRepository<T extends BaseEntity>(
  entity: Type<T>,
  dataSource?: DataSource | DataSourceOptions | string,
): [Type<T>, Provider] {
  return [
    entity,
    {
      provide: getRepositoryToken(entity),
      inject: [getDataSourceToken(dataSource)],
      useFactory(dataSource: DataSource) {
        const baseRepository = dataSource.getRepository(entity);
        return new BaseRepository(
          baseRepository.target,
          baseRepository.manager,
          baseRepository.queryRunner,
        );
      },
    },
  ];
}

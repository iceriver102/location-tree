import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { parseConfig } from '~core/utils/database-config';

@Injectable()
export class DatabaseConfig implements TypeOrmOptionsFactory {
    createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
        const commonConfig: any = {
            maxQueryExecutionTime: 10240,
            pool: {
                max: 512,
            },
            poolSize: 256,
            extra: {
                connectionLimit: 512,
            },
        };
        return { ...commonConfig, ...parseConfig() };
    }

}

import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseConfig } from './database.config';
import { Location } from '~modules/locations/location.entity';
import { DataService } from './database.service';
import { provideRepository } from '~core/utils/custom-repository';

@Global()
@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfig,
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([
      provideRepository(Location)[0]
    ]),
  ],
  providers: [DataService],
  exports: [DataService]

})
export class DatabaseModule { }

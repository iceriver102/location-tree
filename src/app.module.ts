import { Module, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '~core/database/database.module';
import { appConfig } from '~config';
import { UsersModule } from '~modules/users/users.module';
import { AuthGuard } from '~core/guards/auth.guard';
import { LocationModule } from '~modules/locations/location.module';
import { HttpExceptionFilter } from '~core/interceptors/http-exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
      expandVariables: true,
      load: [appConfig],
    }),
    DatabaseModule,
    UsersModule,
    LocationModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
   {
    provide: APP_FILTER,
    useClass: HttpExceptionFilter,
   }
  ],
})
export class AppModule {

}

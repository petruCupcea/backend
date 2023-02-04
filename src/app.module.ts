import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { environment } from '../environments/environment';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { SharedModule } from './shared';
import { CategoriesModule } from "./categories";


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: environment.DB_HOST,
      port: environment.DB_PORT,
      username: environment.DB_USERNAME,
      password: environment.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: false,
    }),
    CategoriesModule,
    SharedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}

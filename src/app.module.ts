import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { environment } from '../environments/environment';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { SharedModule } from './shared';
import { CategoriesModule } from "./categories";
import { AuthenticationModule } from './authentication';
import { ProductsModule } from './products';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: environment.DB_HOST,
      port: environment.DB_PORT,
      username: environment.DB_USERNAME,
      password: environment.DB_PASSWORD,
      database: environment.DB_NAME,
      autoLoadEntities: true,
      synchronize: false,
      extra: {
        charset: 'utf8mb4_general_ci'
      }
    }),
    SharedModule,
    CategoriesModule,
    AuthenticationModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}

import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';
import { ProductsModule } from './products/products.module';
import {ConfigModule} from "@nestjs/config";
import { ProvidersModule } from './providers/providers.module';

@Module({
  imports: [ 
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +(process.env.DB_PORT!),
      username: 'postgres',
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [],
      autoLoadEntities: true,
      synchronize: true,
    }),
    EmployeesModule, 
    ProductsModule, ProvidersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

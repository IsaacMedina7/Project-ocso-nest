import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import { EmployeesModule } from './employees/employees.module';
import { ProductsModule } from './products/products.module';
import {ConfigModule} from "@nestjs/config";
import { ProvidersModule } from './providers/providers.module';
import { ManagersModule } from './managers/managers.module';
import { LocationsModule } from './locations/locations.module';
import { RegionsModule } from './regions/regions.module';
import { AuthModule } from './auth/auth.module';

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
    ProductsModule, ProvidersModule, ManagersModule, LocationsModule, RegionsModule, AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

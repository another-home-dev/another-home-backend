import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomOrmEntity } from './accommodation/infrastructure/database/entities/room.orm-entity';
import { AccommodationModule } from './accommodation/accommodation.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        // Configure the global database connection
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: '127.0.0.1',
            port: 3307,
            username: 'root',
            password: 'ishakya0809',
            database: 'another_home',
            entities: [RoomOrmEntity], // Add any new ORM entities here
            synchronize: true,         // MAGIC: Automatically builds the SQL tables for you based on the entities (Keep this true for dev, false for prod)
        }),
        AuthModule,
        AccommodationModule,
    ],

})
export class AppModule { }
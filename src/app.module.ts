import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomOrmEntity } from './accommodation/infrastructure/database/entities/room.orm-entity';
import { AccommodationModule } from './accommodation/accommodation.module';

@Module({
    imports: [
        // Configure the global database connection
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'root',
            database: 'another_home',
            entities: [RoomOrmEntity], // Add any new ORM entities here
            synchronize: true,         // MAGIC: Automatically builds the SQL tables for you based on the entities (Keep this true for dev, false for prod)
        }),
        AccommodationModule,
    ],

})
export class AppModule { }
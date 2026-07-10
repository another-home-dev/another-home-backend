import { Module } from '@nestjs/common';
// Adjust this path if your accommodation module is inside the infrastructure folder
import { AccommodationModule } from './accommodation/accommodation.module';

@Module({
    imports: [
        // This tells NestJS to load all your Accommodation controllers and services
        AccommodationModule,

        // In the future, you will add your other bounded contexts here:
        // IamModule,
        // FinanceModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule { }
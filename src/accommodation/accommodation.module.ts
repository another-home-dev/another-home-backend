import { Module } from '@nestjs/common';
import { AccommodationController } from './infrastructure/controllers/accommodation.controller';

@Module({
    controllers: [AccommodationController],
    providers: [], // We will add the actual domain use-cases here later
})
export class AccommodationModule { }
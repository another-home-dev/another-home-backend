import { Building } from '../entities/Building';

export const BUILDING_REPOSITORY = Symbol('BUILDING_REPOSITORY');

export interface IBuildingRepository {
    save(building: Building): Promise<Building>;
    findById(id: string): Promise<Building | null>;
    findAll(): Promise<Building[]>;
}

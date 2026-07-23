import { Bed } from "../entities/Bed";

export const BED_REPOSITORY = Symbol('BED_REPOSITORY');

export interface IBedRepository {
    findById(id: string): Promise<Bed | null>;
    save(bed: Bed): Promise<Bed>;
    findOccupiedBeds(): Promise<Bed[]>;
}

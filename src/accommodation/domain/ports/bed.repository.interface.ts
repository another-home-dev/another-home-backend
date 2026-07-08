import { Bed } from "../entities/Bed";

export interface IBedRepository {
    findById(id: string): Promise<Bed | null>;
    save(bed: Bed): Promise<Bed>;

}

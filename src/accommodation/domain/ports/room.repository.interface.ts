import { Room } from '../entities/Room';

// This is just a contract. No TypeORM logic allowed here!
export const ROOM_REPOSITORY = Symbol('ROOM_REPOSITORY'); // Used for NestJS dependency injection

export interface IRoomRepository {
    save(room: Room): Promise<Room>;
    findById(id: string): Promise<Room | null>;
    findByRoomNumber(roomNumber: string): Promise<Room | null>;
    findAll(): Promise<Room[]>;
}
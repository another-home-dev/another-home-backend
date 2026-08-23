import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { RoomOrmEntity } from './room.orm-entity';

@Entity('buildings')
export class BuildingOrmEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 100 })
    name: string;

    @Column({ type: 'varchar', length: 255 })
    address: string;

    @Column({ type: 'int' })
    floorCount: number;

    @OneToMany(() => RoomOrmEntity, (room) => room.building)
    rooms: RoomOrmEntity[];
}

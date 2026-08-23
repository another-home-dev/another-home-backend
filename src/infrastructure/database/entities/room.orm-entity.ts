import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { BedOrmEntity } from './bed.orm-entity';
import { BuildingOrmEntity } from './building.orm-entity';

@Entity('rooms')
export class RoomOrmEntity {
    @PrimaryGeneratedColumn('uuid')
    roomId: string;

    @Column({ type: 'varchar', length: 20, unique: true })
    roomNumber: string;

    @Column({ type: 'int' })
    capacity: number;

    @Column({ type: 'enum', enum: ['Male', 'Female', 'Neutral'] })
    gender: 'Male' | 'Female' | 'Neutral';

    @Column({ type: 'boolean', default: true })
    isAvailable: boolean;

    @Column({ type: 'enum', enum: ['AC', 'Non-AC'], default: 'Non-AC' })
    airConditioning: 'AC' | 'Non-AC';

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    rentPerMonth: number;

    @Column({ type: 'int' })
    floor: number;

    @Column({ type: 'varchar', nullable: true })
    buildingId: string | null;

    @ManyToOne(() => BuildingOrmEntity, (building) => building.rooms, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'buildingId' })
    building: BuildingOrmEntity;

    @OneToMany(() => BedOrmEntity, (bed) => bed.room)
    beds: BedOrmEntity[];

    // --- Technical Metadata (Only lives in the database) ---

    @CreateDateColumn() // TypeORM automatically handles this
    createdAt: Date;

    @UpdateDateColumn() // TypeORM automatically handles this
    updatedAt: Date;

    @DeleteDateColumn() // TypeORM uses this for "Soft Deletes" instead of boolean isDeleted
    deletedAt: Date;
}
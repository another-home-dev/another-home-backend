import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { RoomOrmEntity } from './room.orm-entity';

@Entity('beds')
export class BedOrmEntity {
    @PrimaryColumn()
    bedId: string;

    @Column()
    bedNumber: string;

    @Column({ default: false })
    isOccupied: boolean;

    @Index({ unique: true })
    @Column({ type: 'varchar', nullable: true })
    studentId: string | null; // Will be null if the bed is empty


    @Column()
    roomId: string; // Foreign key mapping it back to the specific Room

    @ManyToOne(() => RoomOrmEntity, (room) => room.beds, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'roomId' })
    room: RoomOrmEntity;
}
import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('beds')
export class BedOrmEntity {
    @PrimaryColumn()
    bedId: string;

    @Column()
    bedNumber: string;

    @Column({ default: false })
    isOccupied: boolean;

    @Column({ nullable: true })
    studentId: string | null; // Will be null if the bed is empty

    @Column()
    roomId: string; // Foreign key mapping it back to the specific Room
}
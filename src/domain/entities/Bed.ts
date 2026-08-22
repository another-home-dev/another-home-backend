export class Bed {
    constructor(
        public readonly id: string,
        public readonly roomId: string,
        public isOccupied: boolean,
        public studentId: string | null = null,
        public readonly bedNumber?: string
    ) { }

    allocateStudent(studentId: string): void {
        if (this.isOccupied) {
            throw new Error('This bed is already occupied. Please choose another bed.');
        }
        this.isOccupied = true;
        this.studentId = studentId;
    }

}

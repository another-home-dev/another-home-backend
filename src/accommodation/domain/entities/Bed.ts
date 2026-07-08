export class Bed {
    constructor(
        public readonly id: string,
        public readonly roomId: string,
        public isOccupied: boolean
    ) { }

    allocateStudent(): void {
        if (this.isOccupied) {
            throw new Error('This bed is already occupied. Please choose another bed.');
        }
        this.isOccupied = true;
    }

}

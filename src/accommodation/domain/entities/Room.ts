export class Room {
    constructor(
        public readonly roomId: string,
        public roomNumber: string,
        public capacity: number,
        public gender: 'Male' | 'Female',
        public isAvailable: boolean,
        public airConditioning: 'AC' | 'Non-AC',
        public rentPerMonth: number,
        public floor: number
        // Notice: No createdAt, updatedAt, or isDeleted here!
    ) { }

    // Example of Domain Logic:
    updateRent(newRent: number): void {
        if (newRent < 0) throw new Error("Rent cannot be negative");
        this.rentPerMonth = newRent;
    }

    markAsUnavailable(): void {
        this.isAvailable = false;
    }
}
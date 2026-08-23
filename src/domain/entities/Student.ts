export class Student {
    constructor(
        public readonly id: string,
        public studentCode: string,
        public name: string,
        public email: string,
        public contact: string,
        public guardianName: string | null = null,
        public guardianContact: string | null = null,
        public address: string | null = null,
        public readonly joinedDate: Date = new Date(),
    ) { }
}

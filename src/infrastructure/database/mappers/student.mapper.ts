import { Student } from '../../../domain/entities/Student';
import { StudentOrmEntity } from '../entities/student.orm-entity';

export class StudentMapper {
    static toDomain(raw: StudentOrmEntity): Student {
        return new Student(
            raw.id,
            raw.studentCode,
            raw.name,
            raw.email,
            raw.contact,
            raw.guardianName,
            raw.guardianContact,
            raw.address,
            raw.joinedDate
        );
    }

    static toPersistence(domainStudent: Student): StudentOrmEntity {
        const ormEntity = new StudentOrmEntity();
        ormEntity.id = domainStudent.id;
        ormEntity.studentCode = domainStudent.studentCode;
        ormEntity.name = domainStudent.name;
        ormEntity.email = domainStudent.email;
        ormEntity.contact = domainStudent.contact;
        ormEntity.guardianName = domainStudent.guardianName;
        ormEntity.guardianContact = domainStudent.guardianContact;
        ormEntity.address = domainStudent.address;
        return ormEntity;
    }
}

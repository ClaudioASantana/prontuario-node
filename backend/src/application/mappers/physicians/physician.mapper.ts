import { Physician } from 'src/domain/entities/physician.entity';
import { PhysicianDto } from 'src/application/dtos/physicians/physician.dto';
import { PhysicianSchema } from 'src/infrastructure/database/schemas/physician.schema';

export class PhysicianMapper {
  static toDomain(raw: PhysicianSchema): Physician {
    const physician = new Physician(
      raw.name,
      raw.email,
      raw.crm,
      raw.status,
      raw.id,
    );
    physician.specialty = raw.specialty ?? undefined;
    physician.phone = raw.phone ?? undefined;
    physician.address = raw.address ?? undefined;
    physician.city = raw.city ?? undefined;
    physician.state = raw.state ?? undefined;
    physician.createdAt = raw.createdAt;
    physician.updatedAt = raw.updatedAt;
    return physician;
  }

  static toDto(domain: Physician): PhysicianDto {
    return {
      id: domain.id,
      name: domain.name,
      email: domain.email,
      crm: domain.crm,
      specialty: domain.specialty,
      phone: domain.phone,
      address: domain.address,
      city: domain.city,
      state: domain.state,
      status: domain.status,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }

  static toPersistence(domain: Physician): PhysicianSchema {
    const schema = new PhysicianSchema();
    schema.id = domain.id;
    schema.name = domain.name;
    schema.email = domain.email;
    schema.crm = domain.crm;
    schema.status = domain.status;
    schema.specialty = domain.specialty ?? null;
    schema.phone = domain.phone ?? null;
    schema.address = domain.address ?? null;
    schema.city = domain.city ?? null;
    schema.state = domain.state ?? null;
    schema.createdAt = domain.createdAt;
    schema.updatedAt = domain.updatedAt;
    return schema;
  }
}

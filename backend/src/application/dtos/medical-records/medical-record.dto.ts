export class CreateMedicalRecordDto {
  patientId: string;
  physicianId: string; // Should be extracted from JWT in Controller usually, but for now passing it? Or maybe 'physicianId' is inferred.
  // Actually, usually the Physician creates it. So physicianId comes from strict context.
  // But DTO might take it if Admin creates it? 
  // Let's assume the Controller extracts it. 
  // But wait, the Handler needs it. 
  // I will include it in DTO for now, or Command.
  
  anamnesis: string;
  diagnosis: string;
  prescription: string;
  examRequest?: string;
  date: Date;
}

export class MedicalRecordDto {
  id: string;
  patientId: string;
  physicianId: string;
  date: Date;
  anamnesis: string;
  diagnosis: string;
  prescription: string;
  examRequest?: string;
  createdAt: Date;
  updatedAt: Date;
}

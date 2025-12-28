import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMedicalRecordAndAuditTables1703698000004 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Medical Records Table
        await queryRunner.createTable(new Table({
            name: "medical_records",
            columns: [
                { name: "id", type: "varchar", isPrimary: true },
                { name: "patientId", type: "varchar" },
                { name: "physicianId", type: "varchar" },
                { name: "date", type: "timestamp" },
                { name: "anamnesis", type: "text" },
                { name: "diagnosis", type: "text" },
                { name: "prescription", type: "text" },
                { name: "examRequest", type: "text", isNullable: true },
                { name: "createdAt", type: "timestamp", default: "CURRENT_TIMESTAMP" },
                { name: "updatedAt", type: "timestamp", default: "CURRENT_TIMESTAMP" },
            ],
            foreignKeys: [
                {
                    columnNames: ["patientId"],
                    referencedTableName: "patients",
                    referencedColumnNames: ["id"],
                    onDelete: "CASCADE",
                },
                {
                    columnNames: ["physicianId"],
                    referencedTableName: "physicians",
                    referencedColumnNames: ["id"],
                    onDelete: "CASCADE",
                },
            ],
        }), true);

        // Audit Logs Table
        await queryRunner.createTable(new Table({
            name: "audit_logs",
            columns: [
                { name: "id", type: "varchar", isPrimary: true },
                { name: "entityName", type: "varchar" },
                { name: "entityId", type: "varchar" },
                { name: "action", type: "varchar" },
                { name: "userId", type: "varchar" },
                { name: "timestamp", type: "timestamp" },
                { name: "details", type: "text", isNullable: true },
            ],
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("audit_logs");
        await queryRunner.dropTable("medical_records");
    }
}

import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePatientTable1703698000002 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "patients",
            columns: [
                {
                    name: "id",
                    type: "varchar",
                    isPrimary: true,
                },
                {
                    name: "name",
                    type: "varchar",
                },
                {
                    name: "email",
                    type: "varchar",
                    isNullable: true, 
                },
                {
                    name: "cpf",
                    type: "varchar",
                    isUnique: true,
                },
                {
                    name: "birthDate",
                    type: "timestamp",
                },
                {
                    name: "gender",
                    type: "varchar",
                },
                {
                    name: "phone",
                    type: "varchar",
                    isNullable: true,
                },
                {
                    name: "address",
                    type: "varchar",
                    isNullable: true,
                },
                {
                    name: "city",
                    type: "varchar",
                    isNullable: true,
                },
                {
                    name: "state",
                    type: "varchar",
                    isNullable: true,
                },
                {
                    name: "bloodType",
                    type: "varchar",
                    isNullable: true,
                },
                {
                    name: "isOrganDonor",
                    type: "boolean",
                    default: false,
                },
                {
                    name: "smoker",
                    type: "boolean",
                    default: false,
                },
                {
                    name: "alcoholConsumption",
                    type: "boolean",
                    default: false,
                },
                {
                    name: "activityLevel",
                    type: "int",
                    default: 0,
                },
                {
                    name: "createdAt",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP",
                },
                {
                    name: "updatedAt",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP",
                },
            ],
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("patients");
    }
}

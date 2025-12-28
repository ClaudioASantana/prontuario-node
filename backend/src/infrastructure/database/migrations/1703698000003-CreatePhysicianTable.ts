import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePhysicianTable1703698000003 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "physicians",
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
                    isNullable: false, 
                },
                {
                    name: "crm",
                    type: "varchar",
                    isUnique: true,
                },
                {
                    name: "specialty",
                    type: "varchar",
                    isNullable: true,
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
                    name: "status",
                    type: "varchar",
                    default: "'Active'",
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
        await queryRunner.dropTable("physicians");
    }
}

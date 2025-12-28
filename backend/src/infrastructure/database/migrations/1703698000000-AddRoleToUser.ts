import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddRoleToUser1703698000000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("users", new TableColumn({
            name: "role",
            type: "varchar",
            default: "'patient'",
            isNullable: false
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("users", "role");
    }
}

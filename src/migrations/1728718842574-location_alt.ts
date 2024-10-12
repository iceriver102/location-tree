import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey, TableIndex } from "typeorm";
import { dbEntityId } from "~core/utils/database-config";

export class LocationAlt1728718842574 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns(
            "tbl_locations",
            [
            new TableColumn({
                name: "locationNumber",
                type: 'varchar',
                length: '10',
                isNullable: false,
                isUnique: true
            }),

            new TableColumn({
                name: "locationArea",
                type: 'float',
                default: "0"
            }),
            new TableColumn({
                name: "locationBuilding",
                type: 'varchar',
                length: "4",
                isNullable: true
            })
            ]
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}

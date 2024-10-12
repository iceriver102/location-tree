import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey, TableIndex } from "typeorm";
import { dbEntityId } from "~core/utils/database-config";

export class LocationAlt1728718842574 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns(
            "tbl_locations",
            [new TableColumn({
                name: 'createById',
                ...dbEntityId(),
                isNullable: true,
                default: undefined
            }),

            new TableColumn({
                name: "locationNumber",
                type: 'varchar',
                length: '10',
                isNullable: false
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

        await queryRunner.createForeignKey(
            'tbl_locations',
            new TableForeignKey({
                referencedColumnNames: ["id"],
                referencedTableName: "tbl_users",
                columnNames: ["createById"],
                name: "frk-locations-users-createBy"
            })
        );


        await queryRunner.createIndex(
            'tbl_locations',
            new TableIndex({ name: "uq-locations-users-locationNumber", columnNames: ["createById", "locationNumber"], isUnique: true })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}

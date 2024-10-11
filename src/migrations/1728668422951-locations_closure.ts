import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class LocationsClosure1728668422951 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'tbl_locations_closure',
                columns: [
                    {
                        name: 'ancestor_id',
                        type: 'varchar',
                        length: '40',
                        isPrimary: true,
                    },
                    {
                        name: 'descendant_id',
                        type: 'varchar',
                        length: '40',
                        isPrimary: true,
                    },
                ],
                foreignKeys: [
                    {
                        columnNames: ["ancestor_id"],
                        name: "frk-location-closure-ancestor-id",
                        referencedTableName: "tbl_locations",
                        referencedColumnNames: ["id"]
                    },
                    {
                        columnNames: ["descendant_id"],
                        name: "frk-location-closure-descendant-id",
                        referencedTableName: "tbl_locations",
                        referencedColumnNames: ["id"]
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}

import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { dbEntityId } from "~core/utils/database-config";

export class LocationsClosure1728668422951 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'tbl_locations_closure',
                columns: [
                    {
                        name: 'ancestor_id',
                        ...dbEntityId(),
                        default: undefined,
                        isPrimary: true,
                    },
                    {
                        name: 'descendant_id',
                        ...dbEntityId(),
                        default: undefined,
                        isPrimary: true,
                    },
                ],
                foreignKeys: [
                    {
                        columnNames: ["ancestor_id"],
                        name: "frk-location-closure-ancestor-id",
                        referencedTableName: "tbl_locations",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    },
                    {
                        columnNames: ["descendant_id"],
                        name: "frk-location-closure-descendant-id",
                        referencedTableName: "tbl_locations",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}

import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { dbEntityId } from "~core/utils/database-config";

export class Locations1728667243717 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'tbl_locations',
                columns: [
                    {
                        name: 'id',
                        ...dbEntityId(),
                        isPrimary: true,
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'level',
                        type: 'varchar',
                    },
                    {
                        name: 'parentId',
                        ...dbEntityId(),
                        isNullable: true,
                        default: undefined
                    },
                    {
                        name: 'createTime',
                        type: 'timestamp',
                        default:"CURRENT_TIMESTAMP"
                    },
                ],
                foreignKeys: [
                    {
                        columnNames: ["parentId"],
                        name: "frk-location-parent-id",
                        referencedTableName: "tbl_locations",
                        referencedColumnNames: ["id"]
                    }
                ]
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}

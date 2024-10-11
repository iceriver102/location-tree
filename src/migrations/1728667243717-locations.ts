import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Locations1728667243717 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'tbl_locations',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                        isGenerated: true,
                        length: '40',
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
                        type: 'varchar',
                        length: '40',
                        isNullable: true,
                    },
                    {
                        name: 'createTime',
                        type: 'datetime'
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

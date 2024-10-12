import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { dbEntityId } from "~core/utils/database-config";

export class Users1728656534899 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'tbl_users',
                columns: [
                    {
                        name: 'id',
                        ...dbEntityId(),
                        isPrimary: true,
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        isUnique: true,
                        isNullable: false,
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                        length: '200',
                        isNullable: false,
                    },
                    {
                        name: 'createTime',
                        type: 'timestamp',
                        default: "CURRENT_TIMESTAMP"
                    },
                ],
            }),
        );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";
import { v4 } from "uuid"

export class UsersAdmin1728657081257 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        //create default user email: admin@gmail.com password: admin
        await queryRunner.query(`INSERT INTO tbl_users (id, email, password, createTime) values("${v4()}","admin@gmail.com","$2a$12$uGXwKHcghA5d6DwqcoA2C.hqLyKr8zgO6RcBYT.Y/fvOfEl5a0XIS","2000-01-01 00:00:00")`,)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}

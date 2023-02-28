import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1677504367065 implements MigrationInterface {
    name = 'sync1677504367065'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "link"
            ADD "idRootPage" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "link"
            ALTER COLUMN "isChecked"
            SET DEFAULT 'false'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "link"
            ALTER COLUMN "isChecked"
            SET DEFAULT false
        `);
        await queryRunner.query(`
            ALTER TABLE "link" DROP COLUMN "idRootPage"
        `);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1677504104617 implements MigrationInterface {
    name = 'sync1677504104617'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "link" DROP COLUMN "path"
        `);
        await queryRunner.query(`
            ALTER TABLE "link"
            ADD "path" character varying
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
            ALTER TABLE "link" DROP COLUMN "path"
        `);
        await queryRunner.query(`
            ALTER TABLE "link"
            ADD "path" real
        `);
    }

}

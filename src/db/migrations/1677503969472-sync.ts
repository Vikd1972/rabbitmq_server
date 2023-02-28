import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1677503969472 implements MigrationInterface {
    name = 'sync1677503969472'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "link"
            ADD "taskDuration" real
        `);
        await queryRunner.query(`
            ALTER TABLE "link"
            ADD "numberOfLinks" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "link" DROP COLUMN "path"
        `);
        await queryRunner.query(`
            ALTER TABLE "link"
            ADD "path" real
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
            ADD "path" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "link" DROP COLUMN "numberOfLinks"
        `);
        await queryRunner.query(`
            ALTER TABLE "link" DROP COLUMN "taskDuration"
        `);
    }

}

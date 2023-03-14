import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1678788355479 implements MigrationInterface {
    name = 'sync1678788355479'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "domain"
            ADD "isChecked" boolean NOT NULL DEFAULT 'false'
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
            ALTER TABLE "domain" DROP COLUMN "isChecked"
        `);
    }

}

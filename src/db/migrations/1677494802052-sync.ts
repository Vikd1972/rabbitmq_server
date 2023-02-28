import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1677494802052 implements MigrationInterface {
    name = 'sync1677494802052'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "link" (
                "id" SERIAL NOT NULL,
                "title" character varying,
                "path" character varying,
                "isChecked" boolean DEFAULT 'false',
                CONSTRAINT "PK_26206fb7186da72fbb9eaa3fac9" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "link"
        `);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1678779463721 implements MigrationInterface {
    name = 'sync1678779463721'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "domain" (
                "id" SERIAL NOT NULL,
                "domain" character varying NOT NULL,
                CONSTRAINT "PK_27e3ec3ea0ae02c8c5bceab3ba9" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "link" DROP COLUMN "idRootPage"
        `);
        await queryRunner.query(`
            ALTER TABLE "link"
            ADD "idDomainId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "link"
            ALTER COLUMN "path"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "link"
            ALTER COLUMN "isChecked"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "link"
            ALTER COLUMN "isChecked"
            SET DEFAULT 'false'
        `);
        await queryRunner.query(`
            ALTER TABLE "link"
            ADD CONSTRAINT "FK_d95a7bfa8c2e49a55694f1ee091" FOREIGN KEY ("idDomainId") REFERENCES "domain"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "link" DROP CONSTRAINT "FK_d95a7bfa8c2e49a55694f1ee091"
        `);
        await queryRunner.query(`
            ALTER TABLE "link"
            ALTER COLUMN "isChecked"
            SET DEFAULT false
        `);
        await queryRunner.query(`
            ALTER TABLE "link"
            ALTER COLUMN "isChecked" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "link"
            ALTER COLUMN "path" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "link" DROP COLUMN "idDomainId"
        `);
        await queryRunner.query(`
            ALTER TABLE "link"
            ADD "idRootPage" integer
        `);
        await queryRunner.query(`
            DROP TABLE "domain"
        `);
    }

}

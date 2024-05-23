import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTranslationTable1716487674486 implements MigrationInterface {
  name = "AddTranslationTable1716487674486";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "translation" ("locale" character varying NOT NULL, "namespace" character varying NOT NULL, "translations" json NOT NULL DEFAULT '{}', CONSTRAINT "PK_a148dc2c7fd9f76e2ac1e4f7556" PRIMARY KEY ("locale", "namespace"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "translation"`);
  }
}

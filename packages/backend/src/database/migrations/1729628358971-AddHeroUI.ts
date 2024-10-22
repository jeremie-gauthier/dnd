import { MigrationInterface, QueryRunner } from "typeorm";

export class AddHeroUI1729628358971 implements MigrationInterface {
  name = "AddHeroUI1729628358971";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "hero_ui" ("name" character varying NOT NULL, "img_url" character varying NOT NULL, CONSTRAINT "PK_35d7582721faa133d43b8e73c0e" PRIMARY KEY ("name"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "hero_ui"`);
  }
}

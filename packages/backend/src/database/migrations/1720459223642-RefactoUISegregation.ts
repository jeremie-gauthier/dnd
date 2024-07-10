import { MigrationInterface, QueryRunner } from "typeorm";

export class RefactoUISegregation1720459223642 implements MigrationInterface {
  name = "RefactoUISegregation1720459223642";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "dice_ui" ("dice_name" character varying NOT NULL, "color" character varying(9) NOT NULL, CONSTRAINT "PK_adfa2cc3784672e65892ae45be9" PRIMARY KEY ("dice_name"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "item_ui" ("item_name" character varying NOT NULL, "img_url" character varying NOT NULL, CONSTRAINT "PK_989b338253ff5d42969d3fbb2b6" PRIMARY KEY ("item_name"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "perk_ui" ("perk_name" character varying NOT NULL, "icon_url" character varying NOT NULL, CONSTRAINT "PK_8201025d431cc528f7c54f813ea" PRIMARY KEY ("perk_name"))`,
    );
    await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "img_url"`);
    await queryRunner.query(`ALTER TABLE "perk" DROP COLUMN "icon_url"`);
    await queryRunner.query(`ALTER TABLE "dice" DROP COLUMN "color"`);
    await queryRunner.query(
      `ALTER TABLE "dice_ui" ADD CONSTRAINT "FK_adfa2cc3784672e65892ae45be9" FOREIGN KEY ("dice_name") REFERENCES "dice"("name") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "item_ui" ADD CONSTRAINT "FK_989b338253ff5d42969d3fbb2b6" FOREIGN KEY ("item_name") REFERENCES "item"("name") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "perk_ui" ADD CONSTRAINT "FK_8201025d431cc528f7c54f813ea" FOREIGN KEY ("perk_name") REFERENCES "perk"("name") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "perk_ui" DROP CONSTRAINT "FK_8201025d431cc528f7c54f813ea"`,
    );
    await queryRunner.query(
      `ALTER TABLE "item_ui" DROP CONSTRAINT "FK_989b338253ff5d42969d3fbb2b6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "dice_ui" DROP CONSTRAINT "FK_adfa2cc3784672e65892ae45be9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "dice" ADD "color" character varying(9) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "perk" ADD "icon_url" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "item" ADD "img_url" character varying NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE "perk_ui"`);
    await queryRunner.query(`DROP TABLE "item_ui"`);
    await queryRunner.query(`DROP TABLE "dice_ui"`);
  }
}

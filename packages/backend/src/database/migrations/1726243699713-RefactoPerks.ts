import { MigrationInterface, QueryRunner } from "typeorm";

export class RefactoPerks1726243699713 implements MigrationInterface {
  name = "RefactoPerks1726243699713";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "item_perks_perk"`);
    await queryRunner.query(
      `ALTER TABLE "perk_ui" DROP CONSTRAINT "FK_8201025d431cc528f7c54f813ea"`,
    );
    await queryRunner.query(`DROP TABLE "perk_ui"`);
    await queryRunner.query(
      `CREATE TABLE "attack_perks_perk" ("attack_id" uuid NOT NULL, "perk_name" character varying NOT NULL, CONSTRAINT "PK_6205095f7afb322e0d8ebd85da5" PRIMARY KEY ("attack_id", "perk_name"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_06183aefbefd9a8d5a7a4b0854" ON "attack_perks_perk" ("attack_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d14f08554a813219c2cdac3219" ON "attack_perks_perk" ("perk_name") `,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."perk_trigger_enum" AS ENUM('special_dice', 'once_per_attack')`,
    );
    await queryRunner.query(
      `ALTER TABLE "perk" ADD "trigger" "public"."perk_trigger_enum" NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "attack_perks_perk" ADD CONSTRAINT "FK_06183aefbefd9a8d5a7a4b08545" FOREIGN KEY ("attack_id") REFERENCES "attack"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "attack_perks_perk" ADD CONSTRAINT "FK_d14f08554a813219c2cdac3219e" FOREIGN KEY ("perk_name") REFERENCES "perk"("name") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "attack_perks_perk" DROP CONSTRAINT "FK_d14f08554a813219c2cdac3219e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "attack_perks_perk" DROP CONSTRAINT "FK_06183aefbefd9a8d5a7a4b08545"`,
    );
    await queryRunner.query(`ALTER TABLE "perk" DROP COLUMN "trigger"`);
    await queryRunner.query(`DROP TYPE "public"."perk_trigger_enum"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d14f08554a813219c2cdac3219"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_06183aefbefd9a8d5a7a4b0854"`,
    );
    await queryRunner.query(`DROP TABLE "attack_perks_perk"`);
  }
}

import type { MigrationInterface, QueryRunner } from "typeorm";

export class HeroCampaignRelations1706463300586 implements MigrationInterface {
  name = "HeroCampaignRelations1706463300586";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "campaign_playable_heroes_hero_template" ("campaign_id" uuid NOT NULL, "hero_template_id" uuid NOT NULL, CONSTRAINT "PK_61311e4f30e7f6f50651e78a6fd" PRIMARY KEY ("campaign_id", "hero_template_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9fd16affcf620be5547987e708" ON "campaign_playable_heroes_hero_template" ("campaign_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f6435dbabe985737eb2967e880" ON "campaign_playable_heroes_hero_template" ("hero_template_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "hero" ADD "campaign_progression_id" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero" ADD CONSTRAINT "FK_2dbfeee2937aae2671065894823" FOREIGN KEY ("campaign_progression_id") REFERENCES "campaign_progression"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_playable_heroes_hero_template" ADD CONSTRAINT "FK_9fd16affcf620be5547987e7085" FOREIGN KEY ("campaign_id") REFERENCES "campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_playable_heroes_hero_template" ADD CONSTRAINT "FK_f6435dbabe985737eb2967e880b" FOREIGN KEY ("hero_template_id") REFERENCES "hero_template"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "campaign_playable_heroes_hero_template" DROP CONSTRAINT "FK_f6435dbabe985737eb2967e880b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_playable_heroes_hero_template" DROP CONSTRAINT "FK_9fd16affcf620be5547987e7085"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero" DROP CONSTRAINT "FK_2dbfeee2937aae2671065894823"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero" DROP COLUMN "campaign_progression_id"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f6435dbabe985737eb2967e880"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9fd16affcf620be5547987e708"`,
    );
    await queryRunner.query(
      `DROP TABLE "campaign_playable_heroes_hero_template"`,
    );
  }
}

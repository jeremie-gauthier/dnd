import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLootRelatedTables1725693718673 implements MigrationInterface {
  name = "AddLootRelatedTables1725693718673";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "campaign_progression_items_looted_item" ("campaign_progression_id" uuid NOT NULL, "item_name" character varying NOT NULL, CONSTRAINT "PK_a44d371c2cb412d1d2518592af5" PRIMARY KEY ("campaign_progression_id", "item_name"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f1c96298a9c396f2b2e4c86133" ON "campaign_progression_items_looted_item" ("campaign_progression_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_625d4e39b5abb51636a9cb9579" ON "campaign_progression_items_looted_item" ("item_name") `,
    );
    await queryRunner.query(
      `ALTER TABLE "item" ADD "is_lootable_in_chest" boolean NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_stage" ADD "max_level_loot" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_progression_items_looted_item" ADD CONSTRAINT "FK_f1c96298a9c396f2b2e4c861330" FOREIGN KEY ("campaign_progression_id") REFERENCES "campaign_progression"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_progression_items_looted_item" ADD CONSTRAINT "FK_625d4e39b5abb51636a9cb9579a" FOREIGN KEY ("item_name") REFERENCES "item"("name") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "campaign_progression_items_looted_item" DROP CONSTRAINT "FK_625d4e39b5abb51636a9cb9579a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_progression_items_looted_item" DROP CONSTRAINT "FK_f1c96298a9c396f2b2e4c861330"`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_stage" DROP COLUMN "max_level_loot"`,
    );
    await queryRunner.query(
      `ALTER TABLE "item" DROP COLUMN "is_lootable_in_chest"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_625d4e39b5abb51636a9cb9579"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f1c96298a9c396f2b2e4c86133"`,
    );
    await queryRunner.query(
      `DROP TABLE "campaign_progression_items_looted_item"`,
    );
  }
}

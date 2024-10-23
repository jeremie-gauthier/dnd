import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveCampaignsUIColumns1729443163344
  implements MigrationInterface
{
  name = "RemoveCampaignsUIColumns1729443163344";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "campaign" DROP CONSTRAINT "UQ_695bb303b0fcb7a033875df2962"`,
    );
    await queryRunner.query(`ALTER TABLE "campaign" DROP COLUMN "title"`);
    await queryRunner.query(`ALTER TABLE "campaign_stage" DROP COLUMN "intro"`);
    await queryRunner.query(`ALTER TABLE "campaign_stage" DROP COLUMN "outro"`);
    await queryRunner.query(`ALTER TABLE "campaign_stage" DROP COLUMN "title"`);
    await queryRunner.query(
      `ALTER TABLE "campaign_playable_heroes_hero_template" DROP CONSTRAINT "FK_9fd16affcf620be5547987e7085"`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_progression" DROP CONSTRAINT "FK_b623a64b8dc76dc6d8d7a72aeab"`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_stage" DROP CONSTRAINT "FK_f75ced37a3d6831637a18e340a6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign" DROP CONSTRAINT "PK_0ce34d26e7f2eb316a3a592cdc4"`,
    );
    await queryRunner.query(`ALTER TABLE "campaign" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "campaign" ADD "id" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign" ADD CONSTRAINT "PK_0ce34d26e7f2eb316a3a592cdc4" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_090cbf92709adca8d9564daf84"`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_stage" DROP COLUMN "campaign_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_stage" ADD "campaign_id" character varying NOT NULL`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_997e97791ec3aa7af5fb205907"`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_progression" DROP COLUMN "campaign_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_progression" ADD "campaign_id" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_playable_heroes_hero_template" DROP CONSTRAINT "PK_61311e4f30e7f6f50651e78a6fd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_playable_heroes_hero_template" ADD CONSTRAINT "PK_f6435dbabe985737eb2967e880b" PRIMARY KEY ("hero_template_id")`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9fd16affcf620be5547987e708"`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_playable_heroes_hero_template" DROP COLUMN "campaign_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_playable_heroes_hero_template" ADD "campaign_id" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_playable_heroes_hero_template" DROP CONSTRAINT "PK_f6435dbabe985737eb2967e880b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_playable_heroes_hero_template" ADD CONSTRAINT "PK_61311e4f30e7f6f50651e78a6fd" PRIMARY KEY ("hero_template_id", "campaign_id")`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_090cbf92709adca8d9564daf84" ON "campaign_stage" ("campaign_id", "order") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_997e97791ec3aa7af5fb205907" ON "campaign_progression" ("campaign_id", "user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9fd16affcf620be5547987e708" ON "campaign_playable_heroes_hero_template" ("campaign_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_stage" ADD CONSTRAINT "FK_f75ced37a3d6831637a18e340a6" FOREIGN KEY ("campaign_id") REFERENCES "campaign"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_progression" ADD CONSTRAINT "FK_b623a64b8dc76dc6d8d7a72aeab" FOREIGN KEY ("campaign_id") REFERENCES "campaign"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_playable_heroes_hero_template" ADD CONSTRAINT "FK_9fd16affcf620be5547987e7085" FOREIGN KEY ("campaign_id") REFERENCES "campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "campaign_playable_heroes_hero_template" DROP CONSTRAINT "FK_9fd16affcf620be5547987e7085"`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_progression" DROP CONSTRAINT "FK_b623a64b8dc76dc6d8d7a72aeab"`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_stage" DROP CONSTRAINT "FK_f75ced37a3d6831637a18e340a6"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9fd16affcf620be5547987e708"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_997e97791ec3aa7af5fb205907"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_090cbf92709adca8d9564daf84"`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_playable_heroes_hero_template" DROP CONSTRAINT "PK_61311e4f30e7f6f50651e78a6fd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_playable_heroes_hero_template" ADD CONSTRAINT "PK_f6435dbabe985737eb2967e880b" PRIMARY KEY ("hero_template_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_playable_heroes_hero_template" DROP COLUMN "campaign_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_playable_heroes_hero_template" ADD "campaign_id" uuid NOT NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9fd16affcf620be5547987e708" ON "campaign_playable_heroes_hero_template" ("campaign_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_playable_heroes_hero_template" DROP CONSTRAINT "PK_f6435dbabe985737eb2967e880b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_playable_heroes_hero_template" ADD CONSTRAINT "PK_61311e4f30e7f6f50651e78a6fd" PRIMARY KEY ("campaign_id", "hero_template_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_progression" DROP COLUMN "campaign_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_progression" ADD "campaign_id" uuid NOT NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_997e97791ec3aa7af5fb205907" ON "campaign_progression" ("campaign_id", "user_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_stage" DROP COLUMN "campaign_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_stage" ADD "campaign_id" uuid NOT NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_090cbf92709adca8d9564daf84" ON "campaign_stage" ("order", "campaign_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign" DROP CONSTRAINT "PK_0ce34d26e7f2eb316a3a592cdc4"`,
    );
    await queryRunner.query(`ALTER TABLE "campaign" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "campaign" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign" ADD CONSTRAINT "PK_0ce34d26e7f2eb316a3a592cdc4" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_stage" ADD CONSTRAINT "FK_f75ced37a3d6831637a18e340a6" FOREIGN KEY ("campaign_id") REFERENCES "campaign"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_progression" ADD CONSTRAINT "FK_b623a64b8dc76dc6d8d7a72aeab" FOREIGN KEY ("campaign_id") REFERENCES "campaign"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_playable_heroes_hero_template" ADD CONSTRAINT "FK_9fd16affcf620be5547987e7085" FOREIGN KEY ("campaign_id") REFERENCES "campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_stage" ADD "title" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_stage" ADD "outro" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_stage" ADD "intro" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign" ADD "title" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign" ADD CONSTRAINT "UQ_695bb303b0fcb7a033875df2962" UNIQUE ("title")`,
    );
  }
}

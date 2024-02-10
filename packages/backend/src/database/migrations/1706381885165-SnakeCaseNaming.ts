import { MigrationInterface, QueryRunner } from 'typeorm';

export class SnakeCaseNaming1706381885165 implements MigrationInterface {
  name = 'SnakeCaseNaming1706381885165';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "campaign_stage" DROP CONSTRAINT "FK_69100b7ad48f0f8043d01ff6ca7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_stage_progression" DROP CONSTRAINT "FK_5ce3e1ac1cf20b918cda5e03018"`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_stage_progression" DROP CONSTRAINT "FK_bd3eeb489ac47b54af6f0f2744d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_progression" DROP CONSTRAINT "FK_a3c62f2b154fcb0b995e2fb1d6b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_progression" DROP CONSTRAINT "FK_2adf8839eecb2dce66537044d3a"`,
    );
    await queryRunner.query(`DROP INDEX "public"."IDX_80fd6ff4d4147fd4baebec29e9"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_d33d94f928158e3b922eaf1aec"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_be83eb8ab3a845247491e83b2b"`);
    await queryRunner.query(`ALTER TABLE "campaign_stage" DROP COLUMN "mapCompiled"`);
    await queryRunner.query(`ALTER TABLE "campaign_stage" DROP COLUMN "campaignId"`);
    await queryRunner.query(
      `ALTER TABLE "campaign_stage_progression" DROP COLUMN "campaignProgressionId"`,
    );
    await queryRunner.query(`ALTER TABLE "campaign_stage_progression" DROP COLUMN "stageId"`);
    await queryRunner.query(`ALTER TABLE "campaign_progression" DROP COLUMN "campaignId"`);
    await queryRunner.query(`ALTER TABLE "campaign_progression" DROP COLUMN "userId"`);
    await queryRunner.query(`ALTER TABLE "hero_template" DROP COLUMN "baseHealthPoints"`);
    await queryRunner.query(`ALTER TABLE "hero_template" DROP COLUMN "baseManaPoints"`);
    await queryRunner.query(`ALTER TABLE "hero_template" DROP COLUMN "baseArmorClass"`);
    await queryRunner.query(`ALTER TABLE "hero_template" DROP COLUMN "baseMovementPoints"`);
    await queryRunner.query(`ALTER TABLE "hero_template" DROP COLUMN "baseActionPoints"`);
    await queryRunner.query(`ALTER TABLE "hero" DROP COLUMN "baseHealthPoints"`);
    await queryRunner.query(`ALTER TABLE "hero" DROP COLUMN "baseManaPoints"`);
    await queryRunner.query(`ALTER TABLE "hero" DROP COLUMN "baseArmorClass"`);
    await queryRunner.query(`ALTER TABLE "hero" DROP COLUMN "baseMovementPoints"`);
    await queryRunner.query(`ALTER TABLE "hero" DROP COLUMN "baseActionPoints"`);
    await queryRunner.query(
      `ALTER TABLE "campaign_stage" ADD "map_compiled" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "campaign_stage" ADD "campaign_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "campaign_stage_progression" ADD "campaign_progression_id" uuid`,
    );
    await queryRunner.query(`ALTER TABLE "campaign_stage_progression" ADD "stage_id" uuid`);
    await queryRunner.query(`ALTER TABLE "campaign_progression" ADD "campaign_id" uuid`);
    await queryRunner.query(`ALTER TABLE "campaign_progression" ADD "user_id" character varying`);
    await queryRunner.query(
      `ALTER TABLE "hero_template" ADD "base_health_points" integer NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "hero_template" ADD "base_mana_points" integer NOT NULL`);
    await queryRunner.query(`ALTER TABLE "hero_template" ADD "base_armor_class" integer NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "hero_template" ADD "base_movement_points" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_template" ADD "base_action_points" integer NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "hero" ADD "base_health_points" integer NOT NULL`);
    await queryRunner.query(`ALTER TABLE "hero" ADD "base_mana_points" integer NOT NULL`);
    await queryRunner.query(`ALTER TABLE "hero" ADD "base_armor_class" integer NOT NULL`);
    await queryRunner.query(`ALTER TABLE "hero" ADD "base_movement_points" integer NOT NULL`);
    await queryRunner.query(`ALTER TABLE "hero" ADD "base_action_points" integer NOT NULL`);
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_090cbf92709adca8d9564daf84" ON "campaign_stage" ("campaign_id", "order") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_da5afe8d6e472dd654037e30c0" ON "campaign_stage_progression" ("campaign_progression_id", "stage_id") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_997e97791ec3aa7af5fb205907" ON "campaign_progression" ("campaign_id", "user_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_stage" ADD CONSTRAINT "FK_f75ced37a3d6831637a18e340a6" FOREIGN KEY ("campaign_id") REFERENCES "campaign"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_stage_progression" ADD CONSTRAINT "FK_6123bbfcc578ef5c1e4a594d252" FOREIGN KEY ("campaign_progression_id") REFERENCES "campaign_progression"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_stage_progression" ADD CONSTRAINT "FK_554ee9f8ace927ca79f9a0b582b" FOREIGN KEY ("stage_id") REFERENCES "campaign_stage"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_progression" ADD CONSTRAINT "FK_b623a64b8dc76dc6d8d7a72aeab" FOREIGN KEY ("campaign_id") REFERENCES "campaign"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_progression" ADD CONSTRAINT "FK_308915acd791c981e4172fbce75" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "campaign_progression" DROP CONSTRAINT "FK_308915acd791c981e4172fbce75"`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_progression" DROP CONSTRAINT "FK_b623a64b8dc76dc6d8d7a72aeab"`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_stage_progression" DROP CONSTRAINT "FK_554ee9f8ace927ca79f9a0b582b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_stage_progression" DROP CONSTRAINT "FK_6123bbfcc578ef5c1e4a594d252"`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_stage" DROP CONSTRAINT "FK_f75ced37a3d6831637a18e340a6"`,
    );
    await queryRunner.query(`DROP INDEX "public"."IDX_997e97791ec3aa7af5fb205907"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_da5afe8d6e472dd654037e30c0"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_090cbf92709adca8d9564daf84"`);
    await queryRunner.query(`ALTER TABLE "hero" DROP COLUMN "base_action_points"`);
    await queryRunner.query(`ALTER TABLE "hero" DROP COLUMN "base_movement_points"`);
    await queryRunner.query(`ALTER TABLE "hero" DROP COLUMN "base_armor_class"`);
    await queryRunner.query(`ALTER TABLE "hero" DROP COLUMN "base_mana_points"`);
    await queryRunner.query(`ALTER TABLE "hero" DROP COLUMN "base_health_points"`);
    await queryRunner.query(`ALTER TABLE "hero_template" DROP COLUMN "base_action_points"`);
    await queryRunner.query(`ALTER TABLE "hero_template" DROP COLUMN "base_movement_points"`);
    await queryRunner.query(`ALTER TABLE "hero_template" DROP COLUMN "base_armor_class"`);
    await queryRunner.query(`ALTER TABLE "hero_template" DROP COLUMN "base_mana_points"`);
    await queryRunner.query(`ALTER TABLE "hero_template" DROP COLUMN "base_health_points"`);
    await queryRunner.query(`ALTER TABLE "campaign_progression" DROP COLUMN "user_id"`);
    await queryRunner.query(`ALTER TABLE "campaign_progression" DROP COLUMN "campaign_id"`);
    await queryRunner.query(`ALTER TABLE "campaign_stage_progression" DROP COLUMN "stage_id"`);
    await queryRunner.query(
      `ALTER TABLE "campaign_stage_progression" DROP COLUMN "campaign_progression_id"`,
    );
    await queryRunner.query(`ALTER TABLE "campaign_stage" DROP COLUMN "campaign_id"`);
    await queryRunner.query(`ALTER TABLE "campaign_stage" DROP COLUMN "map_compiled"`);
    await queryRunner.query(`ALTER TABLE "hero" ADD "baseActionPoints" integer NOT NULL`);
    await queryRunner.query(`ALTER TABLE "hero" ADD "baseMovementPoints" integer NOT NULL`);
    await queryRunner.query(`ALTER TABLE "hero" ADD "baseArmorClass" integer NOT NULL`);
    await queryRunner.query(`ALTER TABLE "hero" ADD "baseManaPoints" integer NOT NULL`);
    await queryRunner.query(`ALTER TABLE "hero" ADD "baseHealthPoints" integer NOT NULL`);
    await queryRunner.query(`ALTER TABLE "hero_template" ADD "baseActionPoints" integer NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "hero_template" ADD "baseMovementPoints" integer NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "hero_template" ADD "baseArmorClass" integer NOT NULL`);
    await queryRunner.query(`ALTER TABLE "hero_template" ADD "baseManaPoints" integer NOT NULL`);
    await queryRunner.query(`ALTER TABLE "hero_template" ADD "baseHealthPoints" integer NOT NULL`);
    await queryRunner.query(`ALTER TABLE "campaign_progression" ADD "userId" character varying`);
    await queryRunner.query(`ALTER TABLE "campaign_progression" ADD "campaignId" uuid`);
    await queryRunner.query(`ALTER TABLE "campaign_stage_progression" ADD "stageId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "campaign_stage_progression" ADD "campaignProgressionId" uuid`,
    );
    await queryRunner.query(`ALTER TABLE "campaign_stage" ADD "campaignId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "campaign_stage" ADD "mapCompiled" character varying NOT NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_be83eb8ab3a845247491e83b2b" ON "campaign_progression" ("campaignId", "userId") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_d33d94f928158e3b922eaf1aec" ON "campaign_stage_progression" ("campaignProgressionId", "stageId") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_80fd6ff4d4147fd4baebec29e9" ON "campaign_stage" ("order", "campaignId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_progression" ADD CONSTRAINT "FK_2adf8839eecb2dce66537044d3a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_progression" ADD CONSTRAINT "FK_a3c62f2b154fcb0b995e2fb1d6b" FOREIGN KEY ("campaignId") REFERENCES "campaign"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_stage_progression" ADD CONSTRAINT "FK_bd3eeb489ac47b54af6f0f2744d" FOREIGN KEY ("stageId") REFERENCES "campaign_stage"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_stage_progression" ADD CONSTRAINT "FK_5ce3e1ac1cf20b918cda5e03018" FOREIGN KEY ("campaignProgressionId") REFERENCES "campaign_progression"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_stage" ADD CONSTRAINT "FK_69100b7ad48f0f8043d01ff6ca7" FOREIGN KEY ("campaignId") REFERENCES "campaign"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}

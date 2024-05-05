import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateManyToOneRelationsNonNullable1714943816805
  implements MigrationInterface
{
  name = "UpdateManyToOneRelationsNonNullable1714943816805";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "attack_dice" DROP CONSTRAINT "FK_7ad63fd9afe1da21bccd0ee607d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "attack_dice" ALTER COLUMN "dice_name" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_stage" DROP CONSTRAINT "FK_f75ced37a3d6831637a18e340a6"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_090cbf92709adca8d9564daf84"`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_stage" ALTER COLUMN "campaign_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_stage_progression" DROP CONSTRAINT "FK_6123bbfcc578ef5c1e4a594d252"`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_stage_progression" DROP CONSTRAINT "FK_554ee9f8ace927ca79f9a0b582b"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_da5afe8d6e472dd654037e30c0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_stage_progression" ALTER COLUMN "campaign_progression_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_stage_progression" ALTER COLUMN "stage_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_progression" DROP CONSTRAINT "FK_b623a64b8dc76dc6d8d7a72aeab"`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_progression" DROP CONSTRAINT "FK_308915acd791c981e4172fbce75"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_997e97791ec3aa7af5fb205907"`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_progression" ALTER COLUMN "campaign_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_progression" ALTER COLUMN "user_id" SET NOT NULL`,
    );
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
      `ALTER TABLE "attack_dice" ADD CONSTRAINT "FK_7ad63fd9afe1da21bccd0ee607d" FOREIGN KEY ("dice_name") REFERENCES "dice"("name") ON DELETE CASCADE ON UPDATE NO ACTION`,
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
    await queryRunner.query(
      `ALTER TABLE "attack_dice" DROP CONSTRAINT "FK_7ad63fd9afe1da21bccd0ee607d"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_997e97791ec3aa7af5fb205907"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_da5afe8d6e472dd654037e30c0"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_090cbf92709adca8d9564daf84"`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_progression" ALTER COLUMN "user_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_progression" ALTER COLUMN "campaign_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_997e97791ec3aa7af5fb205907" ON "campaign_progression" ("campaign_id", "user_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_progression" ADD CONSTRAINT "FK_308915acd791c981e4172fbce75" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_progression" ADD CONSTRAINT "FK_b623a64b8dc76dc6d8d7a72aeab" FOREIGN KEY ("campaign_id") REFERENCES "campaign"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_stage_progression" ALTER COLUMN "stage_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_stage_progression" ALTER COLUMN "campaign_progression_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_da5afe8d6e472dd654037e30c0" ON "campaign_stage_progression" ("campaign_progression_id", "stage_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_stage_progression" ADD CONSTRAINT "FK_554ee9f8ace927ca79f9a0b582b" FOREIGN KEY ("stage_id") REFERENCES "campaign_stage"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_stage_progression" ADD CONSTRAINT "FK_6123bbfcc578ef5c1e4a594d252" FOREIGN KEY ("campaign_progression_id") REFERENCES "campaign_progression"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_stage" ALTER COLUMN "campaign_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_090cbf92709adca8d9564daf84" ON "campaign_stage" ("order", "campaign_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_stage" ADD CONSTRAINT "FK_f75ced37a3d6831637a18e340a6" FOREIGN KEY ("campaign_id") REFERENCES "campaign"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "attack_dice" ALTER COLUMN "dice_name" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "attack_dice" ADD CONSTRAINT "FK_7ad63fd9afe1da21bccd0ee607d" FOREIGN KEY ("dice_name") REFERENCES "dice"("name") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}

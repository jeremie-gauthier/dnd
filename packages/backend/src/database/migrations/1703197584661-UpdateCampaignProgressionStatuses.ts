import type { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateCampaignProgressionStatuses1703197584661
  implements MigrationInterface
{
  name = "UpdateCampaignProgressionStatuses1703197584661";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "public"."campaign_stage_progression_status_enum" RENAME TO "campaign_stage_progression_status_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."campaign_stage_progression_status_enum" AS ENUM('AVAILABLE', 'LOCKED', 'STARTED')`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_stage_progression" ALTER COLUMN "status" TYPE "public"."campaign_stage_progression_status_enum" USING "status"::"text"::"public"."campaign_stage_progression_status_enum"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."campaign_stage_progression_status_enum_old"`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."campaign_progression_status_enum" RENAME TO "campaign_progression_status_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."campaign_progression_status_enum" AS ENUM('AVAILABLE', 'LOCKED', 'STARTED')`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_progression" ALTER COLUMN "status" TYPE "public"."campaign_progression_status_enum" USING "status"::"text"::"public"."campaign_progression_status_enum"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."campaign_progression_status_enum_old"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."campaign_progression_status_enum_old" AS ENUM('AVAILABLE', 'COMING_SOON', 'LOCKED')`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_progression" ALTER COLUMN "status" TYPE "public"."campaign_progression_status_enum_old" USING "status"::"text"::"public"."campaign_progression_status_enum_old"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."campaign_progression_status_enum"`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."campaign_progression_status_enum_old" RENAME TO "campaign_progression_status_enum"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."campaign_stage_progression_status_enum_old" AS ENUM('AVAILABLE', 'COMING_SOON', 'LOCKED', 'STARTED')`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_stage_progression" ALTER COLUMN "status" TYPE "public"."campaign_stage_progression_status_enum_old" USING "status"::"text"::"public"."campaign_stage_progression_status_enum_old"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."campaign_stage_progression_status_enum"`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."campaign_stage_progression_status_enum_old" RENAME TO "campaign_stage_progression_status_enum"`,
    );
  }
}

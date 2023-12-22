import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserAndCampaignTables1702824243264 implements MigrationInterface {
  name = 'AddUserAndCampaignTables1702824243264';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."campaign_status_enum" AS ENUM('AVAILABLE', 'COMING_SOON', 'DISABLED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "campaign" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "status" "public"."campaign_status_enum" NOT NULL, CONSTRAINT "UQ_695bb303b0fcb7a033875df2962" UNIQUE ("title"), CONSTRAINT "PK_0ce34d26e7f2eb316a3a592cdc4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."campaign_stage_status_enum" AS ENUM('AVAILABLE', 'COMING_SOON', 'DISABLED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "campaign_stage" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "order" integer NOT NULL, "title" character varying NOT NULL, "intro" character varying NOT NULL, "outro" character varying NOT NULL, "mapCompiled" character varying NOT NULL, "status" "public"."campaign_stage_status_enum" NOT NULL, "campaignId" uuid, CONSTRAINT "PK_83bdcfdeac49ea7f7e2e294eff6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_80fd6ff4d4147fd4baebec29e9" ON "campaign_stage" ("campaignId", "order") `,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."campaign_stage_progression_status_enum" AS ENUM('AVAILABLE', 'COMING_SOON', 'LOCKED', 'STARTED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "campaign_stage_progression" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" "public"."campaign_stage_progression_status_enum" NOT NULL, "campaignProgressionId" uuid, "stageId" uuid, CONSTRAINT "PK_e74c6f07db511ca4d54601c13c2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_d33d94f928158e3b922eaf1aec" ON "campaign_stage_progression" ("campaignProgressionId", "stageId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."campaign_progression_status_enum" AS ENUM('AVAILABLE', 'COMING_SOON', 'LOCKED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "campaign_progression" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" "public"."campaign_progression_status_enum" NOT NULL, "campaignId" uuid, "userId" character varying, CONSTRAINT "PK_1bea5dedb1c1556c5814a0e01a3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_be83eb8ab3a845247491e83b2b" ON "campaign_progression" ("campaignId", "userId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_stage" ADD CONSTRAINT "FK_69100b7ad48f0f8043d01ff6ca7" FOREIGN KEY ("campaignId") REFERENCES "campaign"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_stage_progression" ADD CONSTRAINT "FK_5ce3e1ac1cf20b918cda5e03018" FOREIGN KEY ("campaignProgressionId") REFERENCES "campaign_progression"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_stage_progression" ADD CONSTRAINT "FK_bd3eeb489ac47b54af6f0f2744d" FOREIGN KEY ("stageId") REFERENCES "campaign_stage"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_progression" ADD CONSTRAINT "FK_a3c62f2b154fcb0b995e2fb1d6b" FOREIGN KEY ("campaignId") REFERENCES "campaign"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_progression" ADD CONSTRAINT "FK_2adf8839eecb2dce66537044d3a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "campaign_progression" DROP CONSTRAINT "FK_2adf8839eecb2dce66537044d3a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_progression" DROP CONSTRAINT "FK_a3c62f2b154fcb0b995e2fb1d6b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_stage_progression" DROP CONSTRAINT "FK_bd3eeb489ac47b54af6f0f2744d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_stage_progression" DROP CONSTRAINT "FK_5ce3e1ac1cf20b918cda5e03018"`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_stage" DROP CONSTRAINT "FK_69100b7ad48f0f8043d01ff6ca7"`,
    );
    await queryRunner.query(`DROP INDEX "public"."IDX_be83eb8ab3a845247491e83b2b"`);
    await queryRunner.query(`DROP TABLE "campaign_progression"`);
    await queryRunner.query(`DROP TYPE "public"."campaign_progression_status_enum"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_d33d94f928158e3b922eaf1aec"`);
    await queryRunner.query(`DROP TABLE "campaign_stage_progression"`);
    await queryRunner.query(`DROP TYPE "public"."campaign_stage_progression_status_enum"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_80fd6ff4d4147fd4baebec29e9"`);
    await queryRunner.query(`DROP TABLE "campaign_stage"`);
    await queryRunner.query(`DROP TYPE "public"."campaign_stage_status_enum"`);
    await queryRunner.query(`DROP TABLE "campaign"`);
    await queryRunner.query(`DROP TYPE "public"."campaign_status_enum"`);
  }
}

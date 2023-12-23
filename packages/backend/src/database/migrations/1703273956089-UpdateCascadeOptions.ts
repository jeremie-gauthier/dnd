import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateCascadeOptions1703273956089 implements MigrationInterface {
  name = 'UpdateCascadeOptions1703273956089';

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
      `ALTER TABLE "campaign_stage" ADD CONSTRAINT "FK_69100b7ad48f0f8043d01ff6ca7" FOREIGN KEY ("campaignId") REFERENCES "campaign"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_stage_progression" ADD CONSTRAINT "FK_5ce3e1ac1cf20b918cda5e03018" FOREIGN KEY ("campaignProgressionId") REFERENCES "campaign_progression"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_stage_progression" ADD CONSTRAINT "FK_bd3eeb489ac47b54af6f0f2744d" FOREIGN KEY ("stageId") REFERENCES "campaign_stage"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_progression" ADD CONSTRAINT "FK_a3c62f2b154fcb0b995e2fb1d6b" FOREIGN KEY ("campaignId") REFERENCES "campaign"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
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
    await queryRunner.query(
      `ALTER TABLE "campaign_progression" ADD CONSTRAINT "FK_a3c62f2b154fcb0b995e2fb1d6b" FOREIGN KEY ("campaignId") REFERENCES "campaign"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_stage_progression" ADD CONSTRAINT "FK_bd3eeb489ac47b54af6f0f2744d" FOREIGN KEY ("stageId") REFERENCES "campaign_stage"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_stage_progression" ADD CONSTRAINT "FK_5ce3e1ac1cf20b918cda5e03018" FOREIGN KEY ("campaignProgressionId") REFERENCES "campaign_progression"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_stage" ADD CONSTRAINT "FK_69100b7ad48f0f8043d01ff6ca7" FOREIGN KEY ("campaignId") REFERENCES "campaign"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class HeroCampaignRelations1706462475246 implements MigrationInterface {
  name = 'HeroCampaignRelations1706462475246';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "hero_template" ADD "campaign_id" uuid`);
    await queryRunner.query(`ALTER TABLE "hero" ADD "campaign_progression_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "hero_template" ADD CONSTRAINT "FK_ca78aae078dac5ceaffd79b23e2" FOREIGN KEY ("campaign_id") REFERENCES "campaign"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero" ADD CONSTRAINT "FK_2dbfeee2937aae2671065894823" FOREIGN KEY ("campaign_progression_id") REFERENCES "campaign_progression"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "hero" DROP CONSTRAINT "FK_2dbfeee2937aae2671065894823"`);
    await queryRunner.query(
      `ALTER TABLE "hero_template" DROP CONSTRAINT "FK_ca78aae078dac5ceaffd79b23e2"`,
    );
    await queryRunner.query(`ALTER TABLE "hero" DROP COLUMN "campaign_progression_id"`);
    await queryRunner.query(`ALTER TABLE "hero_template" DROP COLUMN "campaign_id"`);
  }
}

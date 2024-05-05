import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateMapCompiledColumnToJSON1714943332721
  implements MigrationInterface
{
  name = "UpdateMapCompiledColumnToJSON1714943332721";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "campaign_stage" DROP COLUMN "map_compiled"`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_stage" ADD "map_compiled" json NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "campaign_stage" DROP COLUMN "map_compiled"`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaign_stage" ADD "map_compiled" character varying NOT NULL`,
    );
  }
}

import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPlayableEntityInventoryId1741025957610
  implements MigrationInterface
{
  name = "AddPlayableEntityInventoryId1741025957610";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "playable_entity" ADD "inventory_id" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "playable_entity" ADD CONSTRAINT "UQ_16eaed20c31365c204086cc0831" UNIQUE ("inventory_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "playable_entity" ADD CONSTRAINT "FK_16eaed20c31365c204086cc0831" FOREIGN KEY ("inventory_id") REFERENCES "inventory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "playable_entity" DROP CONSTRAINT "FK_16eaed20c31365c204086cc0831"`,
    );
    await queryRunner.query(
      `ALTER TABLE "playable_entity" DROP CONSTRAINT "UQ_16eaed20c31365c204086cc0831"`,
    );
    await queryRunner.query(
      `ALTER TABLE "playable_entity" DROP COLUMN "inventory_id"`,
    );
  }
}

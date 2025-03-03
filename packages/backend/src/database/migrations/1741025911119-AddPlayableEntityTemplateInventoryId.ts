import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPlayableEntityTemplateInventoryId1741025911119
  implements MigrationInterface
{
  name = "AddPlayableEntityTemplateInventoryId1741025911119";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "hero_template" ADD "inventory_id" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_template" ADD CONSTRAINT "UQ_c8c2f3341d3c0a70dd980dea774" UNIQUE ("inventory_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "monster_template" ADD "inventory_id" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "monster_template" ADD CONSTRAINT "UQ_55fad017ce0cb735085fb69c749" UNIQUE ("inventory_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_template" ADD CONSTRAINT "FK_c8c2f3341d3c0a70dd980dea774" FOREIGN KEY ("inventory_id") REFERENCES "inventory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "monster_template" ADD CONSTRAINT "FK_55fad017ce0cb735085fb69c749" FOREIGN KEY ("inventory_id") REFERENCES "inventory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "monster_template" DROP CONSTRAINT "FK_55fad017ce0cb735085fb69c749"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_template" DROP CONSTRAINT "FK_c8c2f3341d3c0a70dd980dea774"`,
    );
    await queryRunner.query(
      `ALTER TABLE "monster_template" DROP CONSTRAINT "UQ_55fad017ce0cb735085fb69c749"`,
    );
    await queryRunner.query(
      `ALTER TABLE "monster_template" DROP COLUMN "inventory_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_template" DROP CONSTRAINT "UQ_c8c2f3341d3c0a70dd980dea774"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_template" DROP COLUMN "inventory_id"`,
    );
  }
}

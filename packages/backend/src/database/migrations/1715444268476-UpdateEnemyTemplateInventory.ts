import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateEnemyTemplateInventory1715444268476
  implements MigrationInterface
{
  name = "UpdateEnemyTemplateInventory1715444268476";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "enemy_template" RENAME COLUMN "attacks" TO "inventory"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "enemy_template" RENAME COLUMN "inventory" TO "attacks"`,
    );
  }
}

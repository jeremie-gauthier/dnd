import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEnemyTemplateTable1715174643770 implements MigrationInterface {
  name = "AddEnemyTemplateTable1715174643770";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "enemy_template" ("name" character varying NOT NULL, "attacks" json NOT NULL, "characteristic_base_health_points" integer NOT NULL, "characteristic_base_mana_points" integer NOT NULL, "characteristic_base_armor_class" integer NOT NULL, "characteristic_base_movement_points" integer NOT NULL, "characteristic_base_action_points" integer NOT NULL, CONSTRAINT "PK_0ffd5598dc0d39ea621e078ff79" PRIMARY KEY ("name"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "enemy_template"`);
  }
}

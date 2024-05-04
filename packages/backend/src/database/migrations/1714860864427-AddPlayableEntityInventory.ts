import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPlayableEntityInventory1714860864427
  implements MigrationInterface
{
  name = "AddPlayableEntityInventory1714860864427";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."stuff_storage_space_enum" AS ENUM('GEAR', 'BACKPACK')`,
    );
    await queryRunner.query(
      `CREATE TABLE "stuff" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "storage_space" "public"."stuff_storage_space_enum" NOT NULL, "item_name" character varying NOT NULL, "hero_id" uuid NOT NULL, CONSTRAINT "PK_c1df5b5c9d1ed32d6684b292254" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_template" DROP COLUMN "base_armor_class"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_template" DROP COLUMN "base_movement_points"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_template" DROP COLUMN "base_action_points"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_template" DROP COLUMN "base_health_points"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_template" DROP COLUMN "base_mana_points"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero" DROP COLUMN "base_mana_points"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero" DROP COLUMN "base_health_points"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero" DROP COLUMN "base_armor_class"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero" DROP COLUMN "base_movement_points"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero" DROP COLUMN "base_action_points"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_template" ADD "inventory" json NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_template" ADD "characteristic_base_health_points" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_template" ADD "characteristic_base_mana_points" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_template" ADD "characteristic_base_armor_class" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_template" ADD "characteristic_base_movement_points" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_template" ADD "characteristic_base_action_points" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero" ADD "characteristic_base_health_points" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero" ADD "characteristic_base_mana_points" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero" ADD "characteristic_base_armor_class" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero" ADD "characteristic_base_movement_points" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero" ADD "characteristic_base_action_points" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero" ADD "inventory_storage_capacity" json NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "stuff" ADD CONSTRAINT "FK_c668014b5e9f82deaf70a33f9a1" FOREIGN KEY ("item_name") REFERENCES "item"("name") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "stuff" ADD CONSTRAINT "FK_c899dcf42b558999cb524f23b98" FOREIGN KEY ("hero_id") REFERENCES "hero"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "stuff" DROP CONSTRAINT "FK_c899dcf42b558999cb524f23b98"`,
    );
    await queryRunner.query(
      `ALTER TABLE "stuff" DROP CONSTRAINT "FK_c668014b5e9f82deaf70a33f9a1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero" DROP COLUMN "inventory_storage_capacity"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero" DROP COLUMN "characteristic_base_action_points"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero" DROP COLUMN "characteristic_base_movement_points"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero" DROP COLUMN "characteristic_base_armor_class"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero" DROP COLUMN "characteristic_base_mana_points"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero" DROP COLUMN "characteristic_base_health_points"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_template" DROP COLUMN "characteristic_base_action_points"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_template" DROP COLUMN "characteristic_base_movement_points"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_template" DROP COLUMN "characteristic_base_armor_class"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_template" DROP COLUMN "characteristic_base_mana_points"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_template" DROP COLUMN "characteristic_base_health_points"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_template" DROP COLUMN "inventory"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero" ADD "base_action_points" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero" ADD "base_movement_points" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero" ADD "base_armor_class" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero" ADD "base_health_points" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero" ADD "base_mana_points" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_template" ADD "base_mana_points" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_template" ADD "base_health_points" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_template" ADD "base_action_points" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_template" ADD "base_movement_points" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_template" ADD "base_armor_class" integer NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE "stuff"`);
    await queryRunner.query(`DROP TYPE "public"."stuff_storage_space_enum"`);
  }
}

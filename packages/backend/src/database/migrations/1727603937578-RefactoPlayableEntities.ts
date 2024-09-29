import { MigrationInterface, QueryRunner } from "typeorm";

export class RefactoPlayableEntities1727603937578
  implements MigrationInterface
{
  name = "RefactoPlayableEntities1727603937578";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "enemy_template"`);
    await queryRunner.query(
      `CREATE TYPE "public"."monster_template_type_enum" AS ENUM('humanoid', 'gobelinoid', 'undead')`,
    );
    await queryRunner.query(
      `CREATE TABLE "monster_template" ("race" character varying NOT NULL, "type" "public"."monster_template_type_enum" NOT NULL, "inventory" json NOT NULL, "characteristic_base_health_points" integer NOT NULL, "characteristic_base_mana_points" integer NOT NULL, "characteristic_base_armor_class" integer NOT NULL, "characteristic_base_movement_points" integer NOT NULL, "characteristic_base_action_points" integer NOT NULL, CONSTRAINT "PK_c27c942bdf848e2c0f101fc93c7" PRIMARY KEY ("race"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."hero_template_type_enum" AS ENUM('humanoid', 'gobelinoid', 'undead')`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_template" ADD "type" "public"."hero_template_type_enum" NOT NULL`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."hero_template_race_enum" AS ENUM('goblin', 'bugbear', 'human', 'elf', 'halfling')`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_template" ADD "race" "public"."hero_template_race_enum" NOT NULL`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."hero_type_enum" AS ENUM('humanoid', 'gobelinoid', 'undead')`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero" ADD "type" "public"."hero_type_enum" NOT NULL`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."hero_race_enum" AS ENUM('goblin', 'bugbear', 'human', 'elf', 'halfling')`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero" ADD "race" "public"."hero_race_enum" NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "hero" DROP COLUMN "race"`);
    await queryRunner.query(`DROP TYPE "public"."hero_race_enum"`);
    await queryRunner.query(`ALTER TABLE "hero" DROP COLUMN "type"`);
    await queryRunner.query(`DROP TYPE "public"."hero_type_enum"`);
    await queryRunner.query(`ALTER TABLE "hero_template" DROP COLUMN "race"`);
    await queryRunner.query(`DROP TYPE "public"."hero_template_race_enum"`);
    await queryRunner.query(`ALTER TABLE "hero_template" DROP COLUMN "type"`);
    await queryRunner.query(`DROP TYPE "public"."hero_template_type_enum"`);
    await queryRunner.query(`DROP TABLE "monster_template"`);
    await queryRunner.query(`DROP TYPE "public"."monster_template_type_enum"`);
    await queryRunner.query(
      `CREATE TABLE "enemy_template" ("name" character varying NOT NULL, "inventory" json NOT NULL, "characteristic_base_health_points" integer NOT NULL, "characteristic_base_mana_points" integer NOT NULL, "characteristic_base_armor_class" integer NOT NULL, "characteristic_base_movement_points" integer NOT NULL, "characteristic_base_action_points" integer NOT NULL, CONSTRAINT "PK_0ffd5598dc0d39ea621e078ff79" PRIMARY KEY ("name"))`,
    );
  }
}

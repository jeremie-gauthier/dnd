import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPlayableEntity1706378683614 implements MigrationInterface {
  name = 'AddPlayableEntity1706378683614';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."hero_template_class_enum" AS ENUM('WARRIOR', 'CLERIC', 'SORCERER', 'THIEF')`,
    );
    await queryRunner.query(
      `CREATE TABLE "hero_template" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "baseHealthPoints" integer NOT NULL, "baseManaPoints" integer NOT NULL, "baseArmorClass" integer NOT NULL, "baseMovementPoints" integer NOT NULL, "baseActionPoints" integer NOT NULL, "name" character varying NOT NULL, "class" "public"."hero_template_class_enum" NOT NULL, "level" integer NOT NULL, CONSTRAINT "PK_f0b33c71b382a5508a7c213c2c0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_c0cdd01a4b917867ad0dfcd2bc" ON "hero_template" ("name", "class", "level") `,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."hero_class_enum" AS ENUM('WARRIOR', 'CLERIC', 'SORCERER', 'THIEF')`,
    );
    await queryRunner.query(
      `CREATE TABLE "hero" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "baseHealthPoints" integer NOT NULL, "baseManaPoints" integer NOT NULL, "baseArmorClass" integer NOT NULL, "baseMovementPoints" integer NOT NULL, "baseActionPoints" integer NOT NULL, "name" character varying NOT NULL, "class" "public"."hero_class_enum" NOT NULL, "level" integer NOT NULL, CONSTRAINT "PK_313d51d6899322b85f2df99ccde" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "hero"`);
    await queryRunner.query(`DROP TYPE "public"."hero_class_enum"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_c0cdd01a4b917867ad0dfcd2bc"`);
    await queryRunner.query(`DROP TABLE "hero_template"`);
    await queryRunner.query(`DROP TYPE "public"."hero_template_class_enum"`);
  }
}

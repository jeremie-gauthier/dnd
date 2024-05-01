import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAttackItem1714858811830 implements MigrationInterface {
  name = "AddAttackItem1714858811830";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "item" ("name" character varying NOT NULL, "level" integer NOT NULL, "img_url" character varying NOT NULL, "mana_cost" json, "type" character varying NOT NULL, CONSTRAINT "PK_c6ae12601fed4e2ee5019544ddf" PRIMARY KEY ("name"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a6c7fa282dcacbfe6247b28f13" ON "item" ("type") `,
    );
    await queryRunner.query(
      `CREATE TABLE "perk" ("name" character varying NOT NULL, "icon_url" character varying NOT NULL, CONSTRAINT "PK_e6e580c3461b79c3ec4d6774d56" PRIMARY KEY ("name"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."attack_range_enum" AS ENUM('melee', 'long', 'versatile')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."attack_type_enum" AS ENUM('regular', 'super')`,
    );
    await queryRunner.query(
      `CREATE TABLE "attack" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "range" "public"."attack_range_enum" NOT NULL, "type" "public"."attack_type_enum" NOT NULL, "item_name" character varying NOT NULL, CONSTRAINT "PK_b63e4c74e7b45ef2d42a82bdabc" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "dice" ("name" character varying NOT NULL, "color" character varying(9) NOT NULL, "values" json NOT NULL, "min_value" integer NOT NULL, "max_value" integer NOT NULL, "mean_value" double precision NOT NULL, CONSTRAINT "PK_05b8e329851824881056dfae481" PRIMARY KEY ("name"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "attack_dice" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "attack_id" uuid NOT NULL, "dice_name" character varying, CONSTRAINT "PK_395e57ebb70fef189e0fcf280f5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "item_perks_perk" ("item_name" character varying NOT NULL, "perk_name" character varying NOT NULL, CONSTRAINT "PK_eb4e2c4672277f10fb2fb67394d" PRIMARY KEY ("item_name", "perk_name"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_389e571046c543f1659e470fdb" ON "item_perks_perk" ("item_name") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_221d96949a0c29fbc8f8ba0786" ON "item_perks_perk" ("perk_name") `,
    );
    await queryRunner.query(
      `ALTER TABLE "attack" ADD CONSTRAINT "FK_dd3a2692244a016fb277f2e2293" FOREIGN KEY ("item_name") REFERENCES "item"("name") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "attack_dice" ADD CONSTRAINT "FK_36718e4999024ee3d2bb5796d62" FOREIGN KEY ("attack_id") REFERENCES "attack"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "attack_dice" ADD CONSTRAINT "FK_7ad63fd9afe1da21bccd0ee607d" FOREIGN KEY ("dice_name") REFERENCES "dice"("name") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "item_perks_perk" ADD CONSTRAINT "FK_389e571046c543f1659e470fdb4" FOREIGN KEY ("item_name") REFERENCES "item"("name") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "item_perks_perk" ADD CONSTRAINT "FK_221d96949a0c29fbc8f8ba07863" FOREIGN KEY ("perk_name") REFERENCES "perk"("name") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "item_perks_perk" DROP CONSTRAINT "FK_221d96949a0c29fbc8f8ba07863"`,
    );
    await queryRunner.query(
      `ALTER TABLE "item_perks_perk" DROP CONSTRAINT "FK_389e571046c543f1659e470fdb4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "attack_dice" DROP CONSTRAINT "FK_7ad63fd9afe1da21bccd0ee607d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "attack_dice" DROP CONSTRAINT "FK_36718e4999024ee3d2bb5796d62"`,
    );
    await queryRunner.query(
      `ALTER TABLE "attack" DROP CONSTRAINT "FK_dd3a2692244a016fb277f2e2293"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_221d96949a0c29fbc8f8ba0786"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_389e571046c543f1659e470fdb"`,
    );
    await queryRunner.query(`DROP TABLE "item_perks_perk"`);
    await queryRunner.query(`DROP TABLE "attack_dice"`);
    await queryRunner.query(`DROP TABLE "dice"`);
    await queryRunner.query(`DROP TABLE "attack"`);
    await queryRunner.query(`DROP TYPE "public"."attack_type_enum"`);
    await queryRunner.query(`DROP TYPE "public"."attack_range_enum"`);
    await queryRunner.query(`DROP TABLE "perk"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a6c7fa282dcacbfe6247b28f13"`,
    );
    await queryRunner.query(`DROP TABLE "item"`);
  }
}

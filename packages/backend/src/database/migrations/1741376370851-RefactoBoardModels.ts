import { MigrationInterface, QueryRunner } from "typeorm";

export class RefactoBoardModels1741376370851 implements MigrationInterface {
  name = "RefactoBoardModels1741376370851";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "game_event" DROP CONSTRAINT "FK_426f6d808d701deb57f05b03a63"`,
    );
    await queryRunner.query(
      `ALTER TABLE "game_event" DROP CONSTRAINT "FK_c0d920bcadc48f68e040d756a99"`,
    );
    await queryRunner.query(
      `ALTER TABLE "win_condition" DROP CONSTRAINT "FK_a89c63083753dc452656056a453"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_0e32d7130c61d935786cd870b5"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."current_win_condition_name_enum" AS ENUM('defeat_all_monsters')`,
    );
    await queryRunner.query(
      `CREATE TABLE "current_win_condition" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" "public"."current_win_condition_name_enum" NOT NULL, "data" json NOT NULL, "game_id" uuid, CONSTRAINT "PK_7160e48f696f61275bbed49d31c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "game_event" DROP COLUMN "game_id"`);
    await queryRunner.query(
      `ALTER TABLE "game_event" DROP CONSTRAINT "REL_426f6d808d701deb57f05b03a6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "game_event" DROP COLUMN "starting_room_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "game_event" DROP COLUMN "door_coord_row"`,
    );
    await queryRunner.query(
      `ALTER TABLE "game_event" DROP COLUMN "door_coord_column"`,
    );
    await queryRunner.query(
      `ALTER TABLE "win_condition" DROP COLUMN "nb_monsters_remaining"`,
    );
    await queryRunner.query(
      `ALTER TABLE "win_condition" DROP COLUMN "game_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "non_interactive_entity" DROP COLUMN "is_visible"`,
    );
    await queryRunner.query(
      `ALTER TABLE "non_interactive_entity" DROP COLUMN "is_blocking"`,
    );
    await queryRunner.query(
      `ALTER TABLE "non_interactive_entity" DROP COLUMN "can_interact"`,
    );
    await queryRunner.query(
      `ALTER TABLE "game_event" ADD "data" json NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "game_event" ADD "game_template_id" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "win_condition" ADD "data" json NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "win_condition" ADD "game_template_campaign_id" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "tile" DROP CONSTRAINT "FK_90f242b2846e44aa14f3d05119a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tile" ALTER COLUMN "room_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "current_win_condition" ADD CONSTRAINT "FK_fce5af66d70bf8619625c5277f3" FOREIGN KEY ("game_id") REFERENCES "game"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "game_event" ADD CONSTRAINT "FK_e85798e8b48f29ed7ddadb45b37" FOREIGN KEY ("game_template_id") REFERENCES "game"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "win_condition" ADD CONSTRAINT "FK_e4f94af45590c78c7ca8f027a10" FOREIGN KEY ("game_template_campaign_id") REFERENCES "game_template"("campaign_id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tile" ADD CONSTRAINT "FK_90f242b2846e44aa14f3d05119a" FOREIGN KEY ("room_id") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tile" DROP CONSTRAINT "FK_90f242b2846e44aa14f3d05119a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "win_condition" DROP CONSTRAINT "FK_e4f94af45590c78c7ca8f027a10"`,
    );
    await queryRunner.query(
      `ALTER TABLE "game_event" DROP CONSTRAINT "FK_e85798e8b48f29ed7ddadb45b37"`,
    );
    await queryRunner.query(
      `ALTER TABLE "current_win_condition" DROP CONSTRAINT "FK_fce5af66d70bf8619625c5277f3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tile" ALTER COLUMN "room_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "tile" ADD CONSTRAINT "FK_90f242b2846e44aa14f3d05119a" FOREIGN KEY ("room_id") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "win_condition" DROP COLUMN "game_template_campaign_id"`,
    );
    await queryRunner.query(`ALTER TABLE "win_condition" DROP COLUMN "data"`);
    await queryRunner.query(
      `ALTER TABLE "game_event" DROP COLUMN "game_template_id"`,
    );
    await queryRunner.query(`ALTER TABLE "game_event" DROP COLUMN "data"`);
    await queryRunner.query(
      `ALTER TABLE "non_interactive_entity" ADD "can_interact" boolean NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "non_interactive_entity" ADD "is_blocking" boolean NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "non_interactive_entity" ADD "is_visible" boolean NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "win_condition" ADD "game_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "win_condition" ADD "nb_monsters_remaining" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "game_event" ADD "door_coord_column" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "game_event" ADD "door_coord_row" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "game_event" ADD "starting_room_id" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "game_event" ADD CONSTRAINT "REL_426f6d808d701deb57f05b03a6" UNIQUE ("starting_room_id")`,
    );
    await queryRunner.query(`ALTER TABLE "game_event" ADD "game_id" uuid`);
    await queryRunner.query(`DROP TABLE "current_win_condition"`);
    await queryRunner.query(
      `DROP TYPE "public"."current_win_condition_name_enum"`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0e32d7130c61d935786cd870b5" ON "win_condition" ("name") `,
    );
    await queryRunner.query(
      `ALTER TABLE "win_condition" ADD CONSTRAINT "FK_a89c63083753dc452656056a453" FOREIGN KEY ("game_id") REFERENCES "game"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "game_event" ADD CONSTRAINT "FK_c0d920bcadc48f68e040d756a99" FOREIGN KEY ("game_id") REFERENCES "game"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "game_event" ADD CONSTRAINT "FK_426f6d808d701deb57f05b03a63" FOREIGN KEY ("starting_room_id") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}

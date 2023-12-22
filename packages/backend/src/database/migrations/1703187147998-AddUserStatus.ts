import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserStatus1703187147998 implements MigrationInterface {
  name = 'AddUserStatus1703187147998';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."user_status_enum" AS ENUM('CREATED', 'INITIALIZED')`,
    );
    await queryRunner.query(`ALTER TABLE "user" ADD "status" "public"."user_status_enum" NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "status"`);
    await queryRunner.query(`DROP TYPE "public"."user_status_enum"`);
  }
}

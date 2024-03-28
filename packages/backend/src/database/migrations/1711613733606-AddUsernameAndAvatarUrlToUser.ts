import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUsernameAndAvatarUrlToUser1711613733606
  implements MigrationInterface
{
  name = "AddUsernameAndAvatarUrlToUser1711613733606";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "avatar_url" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "username" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "username"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "avatar_url"`);
  }
}

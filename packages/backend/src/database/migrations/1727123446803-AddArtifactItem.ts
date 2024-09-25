import { MigrationInterface, QueryRunner } from "typeorm";

export class AddArtifactItem1727123446803 implements MigrationInterface {
    name = 'AddArtifactItem1727123446803'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item" ADD "has_saving_throw" boolean`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "has_saving_throw"`);
    }

}

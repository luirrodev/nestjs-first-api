import { MigrationInterface, QueryRunner } from 'typeorm';

export class addFieldsToProduct1723400990395 implements MigrationInterface {
  name = 'addFieldsToProduct1723400990395';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "update_at"`);
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "created_at"`);
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class createBrands1723586690644 implements MigrationInterface {
  name = 'createBrands1723586690644';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product" ADD "brand_id" integer`);
    await queryRunner.query(
      `ALTER TABLE "brand" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "brand" ADD "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "product"."created_at" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "product"."update_at" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "brand"."name" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "brand" ADD CONSTRAINT "UQ_5f468ae5696f07da025138e38f7" UNIQUE ("name")`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "user"."created_at" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "user"."update_at" IS NULL`);
    await queryRunner.query(
      `COMMENT ON COLUMN "customer"."created_at" IS NULL`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "customer"."update_at" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "FK_2eb5ce4324613b4b457c364f4a2" FOREIGN KEY ("brand_id") REFERENCES "brand"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "FK_2eb5ce4324613b4b457c364f4a2"`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "customer"."update_at" IS NULL`);
    await queryRunner.query(
      `COMMENT ON COLUMN "customer"."created_at" IS NULL`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "user"."update_at" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "user"."created_at" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "brand" DROP CONSTRAINT "UQ_5f468ae5696f07da025138e38f7"`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "brand"."name" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "product"."update_at" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "product"."created_at" IS NULL`);
    await queryRunner.query(`ALTER TABLE "brand" DROP COLUMN "update_at"`);
    await queryRunner.query(`ALTER TABLE "brand" DROP COLUMN "created_at"`);
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "brand_id"`);
  }
}

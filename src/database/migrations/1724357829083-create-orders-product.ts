import { MigrationInterface, QueryRunner } from 'typeorm';

export class createOrdersProduct1724357829083 implements MigrationInterface {
  name = 'createOrdersProduct1724357829083';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "order" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "customerId" integer, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "order_product" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "quantity" integer NOT NULL, "product_id" integer, "order_id" integer, CONSTRAINT "PK_539ede39e518562dfdadfddb492" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "category"."created_at" IS NULL`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "category"."update_at" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "product"."created_at" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "product"."update_at" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "brand"."created_at" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "brand"."update_at" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "user"."created_at" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "user"."update_at" IS NULL`);
    await queryRunner.query(
      `COMMENT ON COLUMN "customer"."created_at" IS NULL`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "customer"."update_at" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "FK_124456e637cca7a415897dce659" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_product" ADD CONSTRAINT "FK_400f1584bf37c21172da3b15e2d" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_product" ADD CONSTRAINT "FK_ea143999ecfa6a152f2202895e2" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order_product" DROP CONSTRAINT "FK_ea143999ecfa6a152f2202895e2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_product" DROP CONSTRAINT "FK_400f1584bf37c21172da3b15e2d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" DROP CONSTRAINT "FK_124456e637cca7a415897dce659"`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "customer"."update_at" IS NULL`);
    await queryRunner.query(
      `COMMENT ON COLUMN "customer"."created_at" IS NULL`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "user"."update_at" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "user"."created_at" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "brand"."update_at" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "brand"."created_at" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "product"."update_at" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "product"."created_at" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "category"."update_at" IS NULL`);
    await queryRunner.query(
      `COMMENT ON COLUMN "category"."created_at" IS NULL`,
    );
    await queryRunner.query(`DROP TABLE "order_product"`);
    await queryRunner.query(`DROP TABLE "order"`);
  }
}

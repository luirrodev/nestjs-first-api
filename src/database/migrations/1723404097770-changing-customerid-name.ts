import { MigrationInterface, QueryRunner } from 'typeorm';

export class changingCustomeridName1723404097770 implements MigrationInterface {
  name = 'changingCustomeridName1723404097770';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_6c687a8fa35b0ae35ce766b56ce"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" RENAME COLUMN "customerId" TO "customer_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" RENAME CONSTRAINT "REL_6c687a8fa35b0ae35ce766b56c" TO "UQ_d72eb2a5bbff4f2533a5d4caff9"`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "product"."created_at" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "product"."update_at" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "user"."created_at" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "user"."update_at" IS NULL`);
    await queryRunner.query(
      `COMMENT ON COLUMN "customer"."created_at" IS NULL`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "customer"."update_at" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_d72eb2a5bbff4f2533a5d4caff9" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_d72eb2a5bbff4f2533a5d4caff9"`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "customer"."update_at" IS NULL`);
    await queryRunner.query(
      `COMMENT ON COLUMN "customer"."created_at" IS NULL`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "user"."update_at" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "user"."created_at" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "product"."update_at" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "product"."created_at" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "user" RENAME CONSTRAINT "UQ_d72eb2a5bbff4f2533a5d4caff9" TO "REL_6c687a8fa35b0ae35ce766b56c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" RENAME COLUMN "customer_id" TO "customerId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_6c687a8fa35b0ae35ce766b56ce" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}

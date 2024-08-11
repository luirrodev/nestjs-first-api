import {MigrationInterface, QueryRunner} from "typeorm";

export class changingEmailToUnique1723406049907 implements MigrationInterface {
    name = 'changingEmailToUnique1723406049907'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "product"."created_at" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "product"."update_at" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."email" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."created_at" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."update_at" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "customer"."created_at" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "customer"."update_at" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "customer"."update_at" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "customer"."created_at" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."update_at" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."created_at" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."email" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "product"."update_at" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "product"."created_at" IS NULL`);
    }

}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCart1775364162000 implements MigrationInterface {
  name = 'AddCart1775364162000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create enum
    await queryRunner.query(
      `CREATE TYPE "public"."carts_status_enum" AS ENUM('active', 'converted', 'abandoned')`,
    );

    // Create carts table
    await queryRunner.query(`
      CREATE TABLE "carts" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "user_id" uuid,
        "guest_token" character varying,
        "status" "public"."carts_status_enum" NOT NULL DEFAULT 'active',
        "expires_at" TIMESTAMP NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_carts" PRIMARY KEY ("id")
      )
    `);

    // Create cart_items table
    await queryRunner.query(`
      CREATE TABLE "cart_items" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "cart_id" uuid NOT NULL,
        "product_id" uuid NOT NULL,
        "quantity" integer NOT NULL DEFAULT 1,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_cart_items" PRIMARY KEY ("id")
      )
    `);

    // Foreign keys
    await queryRunner.query(
      `ALTER TABLE "carts" ADD CONSTRAINT "FK_carts_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart_items" ADD CONSTRAINT "FK_cart_items_cart" FOREIGN KEY ("cart_id") REFERENCES "carts"("id") ON DELETE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart_items" ADD CONSTRAINT "FK_cart_items_product" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE`,
    );

    // CHECK: cart must have either user_id or guest_token
    await queryRunner.query(
      `ALTER TABLE "carts" ADD CONSTRAINT "CHK_carts_owner" CHECK ("user_id" IS NOT NULL OR "guest_token" IS NOT NULL)`,
    );

    // Unique partial index: one active cart per authenticated user
    await queryRunner.query(
      `CREATE UNIQUE INDEX "UQ_cart_active_user" ON "carts" ("user_id") WHERE "status" = 'active' AND "user_id" IS NOT NULL`,
    );

    // Unique partial index: one active cart per guest token
    await queryRunner.query(
      `CREATE UNIQUE INDEX "UQ_cart_active_guest" ON "carts" ("guest_token") WHERE "status" = 'active' AND "guest_token" IS NOT NULL`,
    );

    // Unique constraint: one product per cart
    await queryRunner.query(
      `ALTER TABLE "cart_items" ADD CONSTRAINT "UQ_cart_items_cart_product" UNIQUE ("cart_id", "product_id")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cart_items" DROP CONSTRAINT "UQ_cart_items_cart_product"`,
    );
    await queryRunner.query(`DROP INDEX "UQ_cart_active_guest"`);
    await queryRunner.query(`DROP INDEX "UQ_cart_active_user"`);
    await queryRunner.query(
      `ALTER TABLE "carts" DROP CONSTRAINT "CHK_carts_owner"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart_items" DROP CONSTRAINT "FK_cart_items_product"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart_items" DROP CONSTRAINT "FK_cart_items_cart"`,
    );
    await queryRunner.query(
      `ALTER TABLE "carts" DROP CONSTRAINT "FK_carts_user"`,
    );
    await queryRunner.query(`DROP TABLE "cart_items"`);
    await queryRunner.query(`DROP TABLE "carts"`);
    await queryRunner.query(`DROP TYPE "public"."carts_status_enum"`);
  }
}

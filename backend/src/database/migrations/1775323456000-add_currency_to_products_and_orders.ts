import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCurrencyToProductsAndOrders1775323456000
  implements MigrationInterface
{
  name = 'AddCurrencyToProductsAndOrders1775323456000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // ── Products: add currency_id (FK) ──
    await queryRunner.query(
      `ALTER TABLE "products" ADD "currency_id" uuid`,
    );

    // Backfill existing products with default currency (USD)
    await queryRunner.query(
      `UPDATE "products" SET "currency_id" = (SELECT "id" FROM "currencies" WHERE "code" = 'USD')`,
    );

    await queryRunner.query(
      `ALTER TABLE "products" ALTER COLUMN "currency_id" SET NOT NULL`,
    );

    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_products_currency" FOREIGN KEY ("currency_id") REFERENCES "currencies"("id") ON DELETE RESTRICT`,
    );

    // ── Order items: add currency snapshot columns ──
    await queryRunner.query(
      `ALTER TABLE "order_items" ADD "currency_code" character varying(3)`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_items" ADD "currency_name" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_items" ADD "currency_symbol" character varying(5)`,
    );

    // Order items: add base currency snapshot + exchange rate columns
    await queryRunner.query(
      `ALTER TABLE "order_items" ADD "base_currency_code" character varying(3)`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_items" ADD "base_currency_symbol" character varying(5)`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_items" ADD "exchange_rate" numeric(18,8) DEFAULT 1`,
    );

    // Backfill existing order items with USD
    await queryRunner.query(
      `UPDATE "order_items" SET "currency_code" = 'USD', "currency_name" = 'Dólar Estadounidense', "currency_symbol" = 'US$', "base_currency_code" = 'USD', "base_currency_symbol" = 'US$', "exchange_rate" = 1`,
    );

    await queryRunner.query(
      `ALTER TABLE "order_items" ALTER COLUMN "currency_code" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_items" ALTER COLUMN "currency_name" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_items" ALTER COLUMN "currency_symbol" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_items" ALTER COLUMN "base_currency_code" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_items" ALTER COLUMN "base_currency_symbol" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_items" ALTER COLUMN "exchange_rate" SET NOT NULL`,
    );

    // ── Orders: add currency snapshot columns ──
    await queryRunner.query(
      `ALTER TABLE "orders" ADD "currency_code" character varying(3)`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD "currency_name" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD "currency_symbol" character varying(5)`,
    );

    // Backfill existing orders with USD
    await queryRunner.query(
      `UPDATE "orders" SET "currency_code" = 'USD', "currency_name" = 'Dólar Estadounidense', "currency_symbol" = 'US$'`,
    );

    await queryRunner.query(
      `ALTER TABLE "orders" ALTER COLUMN "currency_code" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ALTER COLUMN "currency_name" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ALTER COLUMN "currency_symbol" SET NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // ── Orders: drop currency columns ──
    await queryRunner.query(
      `ALTER TABLE "orders" DROP COLUMN "currency_symbol"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" DROP COLUMN "currency_name"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" DROP COLUMN "currency_code"`,
    );

    // ── Order items: drop currency columns ──
    await queryRunner.query(
      `ALTER TABLE "order_items" DROP COLUMN "exchange_rate"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_items" DROP COLUMN "base_currency_symbol"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_items" DROP COLUMN "base_currency_code"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_items" DROP COLUMN "currency_symbol"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_items" DROP COLUMN "currency_name"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_items" DROP COLUMN "currency_code"`,
    );

    // ── Products: drop FK and currency_id ──
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "FK_products_currency"`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" DROP COLUMN "currency_id"`,
    );
  }
}

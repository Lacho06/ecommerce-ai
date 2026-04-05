import { MigrationInterface, QueryRunner } from "typeorm";

export class AddExchangeRateToOrderItems1775324303367 implements MigrationInterface {
    name = 'AddExchangeRateToOrderItems1775324303367'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_products_currency"`);
        await queryRunner.query(`ALTER TABLE "order_items" ADD "base_currency_code" character varying(3) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order_items" ADD "base_currency_symbol" character varying(5) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order_items" ADD "exchange_rate" numeric(18,8) NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_ddec89ba43ccb7f143ddc18270f" FOREIGN KEY ("currency_id") REFERENCES "currencies"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_ddec89ba43ccb7f143ddc18270f"`);
        await queryRunner.query(`ALTER TABLE "order_items" DROP COLUMN "exchange_rate"`);
        await queryRunner.query(`ALTER TABLE "order_items" DROP COLUMN "base_currency_symbol"`);
        await queryRunner.query(`ALTER TABLE "order_items" DROP COLUMN "base_currency_code"`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_products_currency" FOREIGN KEY ("currency_id") REFERENCES "currencies"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

}

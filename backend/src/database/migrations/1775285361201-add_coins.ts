import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCoins1775285361201 implements MigrationInterface {
    name = 'AddCoins1775285361201'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "currencies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" character varying(3) NOT NULL, "name" character varying NOT NULL, "symbol" character varying(5) NOT NULL, "decimal_places" integer NOT NULL DEFAULT '2', "is_default" boolean NOT NULL DEFAULT false, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_9f8d0972aeeb5a2277e40332d29" UNIQUE ("code"), CONSTRAINT "PK_d528c54860c4182db13548e08c4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "exchange_rates" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "rate" numeric(18,8) NOT NULL, "effective_date" date NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "from_currency_id" uuid NOT NULL, "to_currency_id" uuid NOT NULL, CONSTRAINT "UQ_082271d4b83ca2a99a7f81e44e4" UNIQUE ("from_currency_id", "to_currency_id", "effective_date"), CONSTRAINT "CHK_f7587ecf323a86d146b82ebf9b" CHECK ("rate" > 0), CONSTRAINT "CHK_1ca99deec58daf41c31e69fb8c" CHECK ("from_currency_id" != "to_currency_id"), CONSTRAINT "PK_33a614bad9e61956079d817ebe2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "exchange_rates" ADD CONSTRAINT "FK_b2ef436f4da7ada3cf6b5c27f4c" FOREIGN KEY ("from_currency_id") REFERENCES "currencies"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exchange_rates" ADD CONSTRAINT "FK_437913540d381a4e268a682ee94" FOREIGN KEY ("to_currency_id") REFERENCES "currencies"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exchange_rates" DROP CONSTRAINT "FK_437913540d381a4e268a682ee94"`);
        await queryRunner.query(`ALTER TABLE "exchange_rates" DROP CONSTRAINT "FK_b2ef436f4da7ada3cf6b5c27f4c"`);
        await queryRunner.query(`DROP TABLE "exchange_rates"`);
        await queryRunner.query(`DROP TABLE "currencies"`);
    }

}

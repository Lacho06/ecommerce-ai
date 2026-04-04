import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOrders1775279246111 implements MigrationInterface {
    name = 'AddOrders1775279246111'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_addresses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "label" character varying, "recipient_name" character varying NOT NULL, "street" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "postal_code" character varying NOT NULL, "country" character varying NOT NULL DEFAULT 'MX', "phone" character varying, "is_default" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid NOT NULL, CONSTRAINT "PK_8abbeb5e3239ff7877088ffc25b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "payforms" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "code" character varying NOT NULL, "provider" character varying, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_278e9c35e6228bb39488bb0eab8" UNIQUE ("name"), CONSTRAINT "UQ_bd48be7019edbfa8df261e3fc39" UNIQUE ("code"), CONSTRAINT "PK_de1eccfa4c759daa60c465d7660" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "product_name" character varying NOT NULL, "product_sku" character varying NOT NULL, "unit_price" numeric(10,2) NOT NULL, "quantity" integer NOT NULL DEFAULT '1', "order_id" uuid NOT NULL, "product_id" uuid, CONSTRAINT "PK_005269d8574e6fac0493715c308" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."order_payments_status_enum" AS ENUM('pending', 'completed', 'failed', 'refunded', 'partially_refunded')`);
        await queryRunner.query(`CREATE TABLE "order_payments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "payform_name" character varying NOT NULL, "payform_code" character varying NOT NULL, "payform_provider" character varying, "last_four" character varying(4), "amount" numeric(10,2) NOT NULL, "status" "public"."order_payments_status_enum" NOT NULL DEFAULT 'pending', "transaction_id" character varying, "paid_at" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "order_id" uuid NOT NULL, "payform_id" uuid NOT NULL, CONSTRAINT "REL_5d2ebca202f9d9370a001a571b" UNIQUE ("order_id"), CONSTRAINT "PK_bc14b014a69d39c7bbc4a154b69" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."order_shipping_shipping_method_enum" AS ENUM('standard', 'express', 'pickup')`);
        await queryRunner.query(`CREATE TABLE "order_shipping" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "recipient_name" character varying NOT NULL, "street" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "postal_code" character varying NOT NULL, "country" character varying NOT NULL DEFAULT 'MX', "phone" character varying, "shipping_method" "public"."order_shipping_shipping_method_enum" NOT NULL DEFAULT 'standard', "tracking_number" character varying, "order_id" uuid NOT NULL, CONSTRAINT "REL_b4a21d5bd902c38f79c019fbe9" UNIQUE ("order_id"), CONSTRAINT "PK_9e1174bf865646026aba95d2ae0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."order_status_history_status_enum" AS ENUM('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded', 'partially_refunded')`);
        await queryRunner.query(`CREATE TABLE "order_status_history" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" "public"."order_status_history_status_enum" NOT NULL, "note" text, "changed_at" TIMESTAMP NOT NULL DEFAULT now(), "order_id" uuid NOT NULL, CONSTRAINT "PK_e6c66d853f155531985fc4f6ec8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."orders_status_enum" AS ENUM('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded', 'partially_refunded')`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "order_number" character varying NOT NULL, "status" "public"."orders_status_enum" NOT NULL DEFAULT 'pending', "subtotal" numeric(10,2) NOT NULL, "shipping_cost" numeric(10,2) NOT NULL DEFAULT '0', "tax" numeric(10,2) NOT NULL DEFAULT '0', "total" numeric(10,2) NOT NULL, "notes" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid NOT NULL, CONSTRAINT "UQ_75eba1c6b1a66b09f2a97e6927b" UNIQUE ("order_number"), CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_addresses" ADD CONSTRAINT "FK_7a5100ce0548ef27a6f1533a5ce" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_items" ADD CONSTRAINT "FK_145532db85752b29c57d2b7b1f1" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_items" ADD CONSTRAINT "FK_9263386c35b6b242540f9493b00" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_payments" ADD CONSTRAINT "FK_5d2ebca202f9d9370a001a571ba" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_payments" ADD CONSTRAINT "FK_e01f0270b3a32c9e8cba1c30789" FOREIGN KEY ("payform_id") REFERENCES "payforms"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_shipping" ADD CONSTRAINT "FK_b4a21d5bd902c38f79c019fbe99" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_status_history" ADD CONSTRAINT "FK_1ca7d5228cf9dc589b60243933c" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_a922b820eeef29ac1c6800e826a" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_a922b820eeef29ac1c6800e826a"`);
        await queryRunner.query(`ALTER TABLE "order_status_history" DROP CONSTRAINT "FK_1ca7d5228cf9dc589b60243933c"`);
        await queryRunner.query(`ALTER TABLE "order_shipping" DROP CONSTRAINT "FK_b4a21d5bd902c38f79c019fbe99"`);
        await queryRunner.query(`ALTER TABLE "order_payments" DROP CONSTRAINT "FK_e01f0270b3a32c9e8cba1c30789"`);
        await queryRunner.query(`ALTER TABLE "order_payments" DROP CONSTRAINT "FK_5d2ebca202f9d9370a001a571ba"`);
        await queryRunner.query(`ALTER TABLE "order_items" DROP CONSTRAINT "FK_9263386c35b6b242540f9493b00"`);
        await queryRunner.query(`ALTER TABLE "order_items" DROP CONSTRAINT "FK_145532db85752b29c57d2b7b1f1"`);
        await queryRunner.query(`ALTER TABLE "user_addresses" DROP CONSTRAINT "FK_7a5100ce0548ef27a6f1533a5ce"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TYPE "public"."orders_status_enum"`);
        await queryRunner.query(`DROP TABLE "order_status_history"`);
        await queryRunner.query(`DROP TYPE "public"."order_status_history_status_enum"`);
        await queryRunner.query(`DROP TABLE "order_shipping"`);
        await queryRunner.query(`DROP TYPE "public"."order_shipping_shipping_method_enum"`);
        await queryRunner.query(`DROP TABLE "order_payments"`);
        await queryRunner.query(`DROP TYPE "public"."order_payments_status_enum"`);
        await queryRunner.query(`DROP TABLE "order_items"`);
        await queryRunner.query(`DROP TABLE "payforms"`);
        await queryRunner.query(`DROP TABLE "user_addresses"`);
    }

}

import {MigrationInterface, QueryRunner} from "typeorm";

export class NewVersionOfShopItemEntity1684177341132 implements MigrationInterface {
    name = 'NewVersionOfShopItemEntity1684177341132'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `shop_item` CHANGE `createdAt` `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `shop_item` CHANGE `createdAt` `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP()");
    }

}

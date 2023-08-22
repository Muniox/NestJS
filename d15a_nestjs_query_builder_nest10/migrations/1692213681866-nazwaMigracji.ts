import { MigrationInterface, QueryRunner } from "typeorm";

export class NazwaMigracji1692213681866 implements MigrationInterface {
    name = 'NazwaMigracji1692213681866'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`shop_item\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`shop_item\` ADD \`name\` varchar(25) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`shop_item\` CHANGE \`description\` \`description\` text NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`shop_item\` CHANGE \`createdAt\` \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`shop_item\` CHANGE \`createdAt\` \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`shop_item\` CHANGE \`description\` \`description\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`shop_item\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`shop_item\` ADD \`name\` varchar(60) NOT NULL`);
    }

}

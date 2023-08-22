"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NazwaMigracji1692213681866 = void 0;
class NazwaMigracji1692213681866 {
    constructor() {
        this.name = 'NazwaMigracji1692213681866';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`shop_item\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`shop_item\` ADD \`name\` varchar(25) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`shop_item\` CHANGE \`description\` \`description\` text NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`shop_item\` CHANGE \`createdAt\` \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`shop_item\` CHANGE \`createdAt\` \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`shop_item\` CHANGE \`description\` \`description\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`shop_item\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`shop_item\` ADD \`name\` varchar(60) NOT NULL`);
    }
}
exports.NazwaMigracji1692213681866 = NazwaMigracji1692213681866;
//# sourceMappingURL=1692213681866-nazwaMigracji.js.map
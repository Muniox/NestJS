"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NazwaMigracji1692184965207 = void 0;
class NazwaMigracji1692184965207 {
    constructor() {
        this.name = 'NazwaMigracji1692184965207';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`shop_item\` CHANGE \`createdAt\` \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`shop_item\` CHANGE \`createdAt\` \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
    }
}
exports.NazwaMigracji1692184965207 = NazwaMigracji1692184965207;
//# sourceMappingURL=1692184965207-nazwaMigracji.js.map
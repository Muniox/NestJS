"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTypeOrmConfig = void 0;
const getTypeOrmConfig = (configService) => ({
    type: 'mysql',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_DATABASE'),
    bigNumberStrings: false,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: configService.get('DB_SYNCHRONIZE'),
    logging: configService.get('DB_LOGGING'),
});
exports.getTypeOrmConfig = getTypeOrmConfig;
//# sourceMappingURL=typeorm.config.js.map
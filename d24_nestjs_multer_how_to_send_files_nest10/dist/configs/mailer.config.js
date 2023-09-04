"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodeMailerConfig = void 0;
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
exports.nodeMailerConfig = {
    transport: `smtp://admin123:admin456@localhost:2500`,
    defaults: {
        from: `admin@test.com`,
    },
    template: {
        dir: `./templates/email`,
        adapter: new handlebars_adapter_1.HandlebarsAdapter(),
        options: {
            strict: true,
        },
    },
};
//# sourceMappingURL=mailer.config.js.map
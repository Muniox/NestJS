import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
export declare const nodeMailerConfig: {
    transport: string;
    defaults: {
        from: string;
    };
    template: {
        dir: string;
        adapter: HandlebarsAdapter;
        options: {
            strict: boolean;
        };
    };
};

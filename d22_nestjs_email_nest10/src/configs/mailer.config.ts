import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

export const nodeMailerConfig = {
  // transport: `smtp://NAZWA_UZYTKOWNIKA:HASŁO_UZYTKOWNIKA@HOST:PORT`,
  transport: `smtp://admin123:admin456@localhost:2500`,
  defaults: {
    // from: `POLE@OD.COM`,
    from: `admin@test.com`,
  },
  template: {
    dir: `./templates/email`,
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
};

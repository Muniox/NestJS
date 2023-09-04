import * as crypto from 'crypto';

export const hashPwd = (p: string): string => {
  const hmac = crypto.createHmac(
    'sha512',
    'Sól - Twój dowolny tekst pe aplikacja - najlepiej dosyć długi',
  );
  hmac.update(p);
  return hmac.digest('hex');
};

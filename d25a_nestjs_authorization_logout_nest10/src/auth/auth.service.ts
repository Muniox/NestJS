import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { AuthLoginDto } from './dto/auth-login.dto';
import { User } from 'src/user/user.entity';
import { hashPwd } from 'src/utils/hash-pwd';
import { v4 as uuid } from 'uuid';
import { sign } from 'jsonwebtoken';
import { JwtPayload } from './jwt.strategy';

@Injectable()
export class AuthService {
  private createToken(currentTokenId: string): {
    accessToken: string;
    expiresIn: number;
  } {
    const payload: JwtPayload = { id: currentTokenId };
    const expiresIn = 60 * 60 * 24;
    const accessToken = sign(
      payload,
      'Tajemniczy tekst, osobny dla każdej apki, długi',
      { expiresIn },
    ); // tekst taki samy jak do jwt strategy

    return {
      accessToken,
      expiresIn,
    };
  }

  private async generateToken(user: User): Promise<string> {
    let token: any;
    let userWithThisToken = null;
    do {
      token = uuid();
      userWithThisToken = await User.findOneBy({ currentTokenId: token });
    } while (!!userWithThisToken);

    user.currentTokenId = token;
    await user.save();

    return token;
  }

  async login(req: AuthLoginDto, res: Response): Promise<any> {
    try {
      const user = await User.findOneBy({
        email: req.email,
        pwdHash: hashPwd(req.pwd),
      });

      if (!user) {
        return res.json({ error: 'Invalid login data!' });
      }

      const token = this.createToken(await this.generateToken(user));

      return res
        .cookie('jwt', token.accessToken, {
          secure: false, //true jesli używasz https
          domain: 'localhost',
          httpOnly: true,
        })
        .json({ ok: true });
    } catch (e) {
      return res.json({
        error: e.message,
      });
    }
  }

  async logout(user: User, res: Response) {
    try {
      user.currentTokenId = null;
      await user.save();
      res.clearCookie('jwt', {
        secure: false,
        domain: 'localhost',
        httpOnly: true,
      });
      return res.json({ ok: true });
    } catch (e) {
      return res.json({ error: e.message });
    }
  }
}

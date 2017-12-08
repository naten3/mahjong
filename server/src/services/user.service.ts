import * as SocksJs from 'socksjs'
import * as Jwt from 'jwt-express'

import { User } from '../models'


export class UserService {
  secret: String;
  userMap: Map<number, User> = new Map()
  id=1;

  constructor(secret: String) {
    this.secret = secret;
  }

// returns jwt
  public signIn(name: string): TokenPayload {
    let id = this.nextId();
    let token: TokenPayload = Jwt.create(this.secret, new JwtPayloadImpl(id));
    this.userMap.set(id, new User(id, name));
    return token;
  }

  public getUserFromId(id: number): User | undefined {
    return this.userMap.get(id);
  }

  private nextId(): number {
    let id = this.id;
    this.id++;
    return id;
  }
}

export interface JwtPayload {
  id: number;
}

export class JwtPayloadImpl implements JwtPayload {
  id: number;

  constructor(id: number) {
    this.id = id;
  }
}

interface TokenPayload{
  token: string;
}

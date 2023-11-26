import * as bcrypt from "bcrypt";

import { getUserByEmail } from "../dal/users";
import { Err, isErr, Ok, Result } from "../framework/Result";

type AuthorizationToken = string;

class AuthenticationService {
  constructor() {}

  authenticate = async (
    email: string,
    password: string,
  ): Promise<Result<AuthorizationToken, string>> => {
    const result = await getUserByEmail(email);

    if (isErr(result)) {
      return Err("Authentication failure");
    }

    const user = result.value;
    const isPasswordTheSame = await bcrypt.compare(password, user.password);

    if (!isPasswordTheSame) {
      return Err("Authentication failure");
    }

    return Ok(user.accessToken);
  };
}

export const authenticationService = new AuthenticationService();

import { NextFunction, Request, Response } from "@tinyhttp/app";

import { BaseController } from "../../../framework/BaseController";
import { authenticationService } from "../../../services/AuthenticationService";
import { isErr } from "../../../framework/Result";

export class AuthenticationController extends BaseController {
  constructor() {
    super();

    this.router.post("/login", this.login);
  }

  login = async (req: Request, res: Response, _: NextFunction) => {
    // TODO: add req body validation
    const result = await authenticationService.authenticate(
      req.body.email,
      req.body.password,
    );

    if (isErr(result)) {
      res.status(401).json(result.error);
      return;
    }

    res.status(200).json({
      authorizationToken: result.value,
    });
  };

  static get path() {
    return "/auth";
  }
}

import { BaseController } from "../../../framework/BaseController";
import { restrictMiddleware } from "./middlewares/restrictMiddleware";
import { AuthenticationController } from "./AuthenticationController";
import { UsersController } from "./UsersController";

export class ApiV1Controller extends BaseController {
  constructor() {
    super();

    this.router
      .use(AuthenticationController.path, new AuthenticationController().router)
      .use(restrictMiddleware) // Everything past this middleware needs authentication
      .use(UsersController.path, new UsersController().router);
  }

  static get path() {
    return "/api/v1";
  }
}

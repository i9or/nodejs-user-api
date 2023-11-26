import { App } from "@tinyhttp/app";

import { notFoundHandler } from "../handlers/notFoundHandler";
import { serverErrorHandler } from "../handlers/serverErrorHandler";

export abstract class BaseController {
  private readonly _router = new App({
    noMatchHandler: notFoundHandler,
    onError: serverErrorHandler,
  });

  get router() {
    return this._router;
  }

  static get path(): string {
    throw new Error(`${this.name}#path is not implemented`);
  }
}

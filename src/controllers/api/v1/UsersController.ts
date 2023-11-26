import { Request, Response } from "@tinyhttp/app";

import { BaseController } from "../../../framework/BaseController";

export class UsersController extends BaseController {
  constructor() {
    super();

    this.router.get("/", this.index);
    this.router.get("/:id", this.show);
    this.router.put("/:id", this.update);
    this.router.delete("/:id", this.destroy);
  }

  index = (_: Request, res: Response) => {
    res.json({
      message: "UsersController#index",
    });
  };

  show = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    res.json({
      message: `UsersController#index:${id}`,
    });
  };

  update = (req: Request, res: Response) => {
    const data = req.body;
    const id = parseInt(req.params.id);

    res.json({
      message: `UsersController#update:${id}@${JSON.stringify(data)}`,
    });
  };

  destroy = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    res.sendStatus(204);
  };

  static get path() {
    return "/users";
  }
}

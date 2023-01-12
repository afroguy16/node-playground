import { Request } from "express-validator/src/base";

export default (passwordToCompare: string, req: Request) =>
  passwordToCompare === req.body.password;

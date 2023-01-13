import { Request } from "express-validator/src/base";

export default async (req: Request) =>
  Boolean(req.session.resetPasswordTokenObject.expiration > Date.now());

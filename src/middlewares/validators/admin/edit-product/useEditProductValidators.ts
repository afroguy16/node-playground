import { ErrorService } from "../../ErrorService";
import validateDescription from "../shared/validators/validateDescription";
import validatePrice from "../shared/validators/validatePrice";
import validateTitle from "../shared/validators/validateTitle";
import validateAuthority from "./validators/validateAuthority";
import validateProductAvailability from "./validators/validateProductAvailability";

export default async (source, req, next?) => {
  const { title, description, price } = source;
  // Initialize ErrorService instance
  new ErrorService(req);

  // call validators
  title && validateTitle(source, req);
  description && validateDescription(source, req);
  price && validatePrice(source, req);
  await validateProductAvailability(source, req);

  validateAuthority(req.product.userId, req.jwt?.userId, req);

  next && next();
};

import { ErrorService } from "../../ErrorService";
import validateAuthority from "../delete-product/validators/validateAuthority";
import validateDescription from "../shared/validators/validateDescription";
import validatePrice from "../shared/validators/validatePrice";
import validateTitle from "../shared/validators/validateTitle";

export default (source, req, next?) => {
  // Initialize ErrorService instance
  new ErrorService(req);

  // call validators
  validateTitle(source, req);
  validatePrice(source, req);
  // validateDescription()
  next && next();
};

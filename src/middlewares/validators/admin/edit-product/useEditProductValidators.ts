import validateDescription from "../shared/validators/validateDescription";
import validatePrice from "../shared/validators/validatePrice";
import validateTitle from "../shared/validators/validateTitle";
import validateAuthority from "./validators/validateAuthority";

export default (() => {
  return [
    // validateTitle(), // TODO - fix this to work with REST
    // validatePrice(), // TODO - fix this to work with REST
    validateDescription(),
    validateAuthority(),
  ];
})();

import validateAuthority from "./validators/validateAuthority";
import validateDescription from "./validators/validateDescription";
import validatePrice from "./validators/validatePrice";
import validateTitle from "./validators/validateTitle";

export default (() => {
  return [
    validateTitle(),
    validatePrice(),
    validateDescription(),
    validateAuthority(),
  ];
})();

import validateAuthority from "../delete-product/validators/validateAuthority";
import validateDescription from "../shared/validators/validateDescription";
import validatePrice from "../shared/validators/validatePrice";
import validateTitle from "../shared/validators/validateTitle";

export default (() => {
  return [validateTitle(), validatePrice(), validateDescription()];
})();

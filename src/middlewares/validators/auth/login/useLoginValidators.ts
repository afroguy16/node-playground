import validateEmail from "../shared/validators/validateUserEmail";
import validatePassword from "./validators/validatePassword";

export default (() => {
  return [validateEmail(), validatePassword()];
})();

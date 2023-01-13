import validateConfirmPassword from "../shared/validators/validateConfirmPassword";
import validateEmail from "./validators/validateEmail";
import validatePassword from "../shared/validators/validatePassword";
import validateUsername from "./validators/validateUsername";

export default (() => {
  return [
    validateUsername(),
    validateEmail(),
    validatePassword(),
    validateConfirmPassword(),
  ];
})();

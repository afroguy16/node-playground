import validateConfirmPassword from "./validators/validateConfirmPassword";
import validateEmail from "./validators/validateEmail";
import validatePassword from "./validators/validatePassword";
import validateUsername from "./validators/validateUsername";

export default (() => {
  return [
    validateUsername(),
    validateEmail(),
    validatePassword(),
    validateConfirmPassword(),
  ];
})();

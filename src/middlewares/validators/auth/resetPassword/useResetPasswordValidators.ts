import validatePassword from "../shared/validators/validatePassword";
import validateConfirmPassword from "../shared/validators/validateConfirmPassword";
import validateUserEmail from "./validators/validateUserEmail";
import validateToken from "./validators/validateToken";

export default (() => {
  return [
    validatePassword(),
    validateConfirmPassword(),
    validateToken(),
    validateUserEmail(),
  ];
})();

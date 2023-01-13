import validateEmail from "./validators/validateEmail";
import validatePassword from "./validators/validatePassword";

export default (() => {
  return [validateEmail(), validatePassword()];
})();

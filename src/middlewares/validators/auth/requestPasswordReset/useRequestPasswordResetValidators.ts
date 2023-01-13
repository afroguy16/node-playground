import validateEmail from "./validators/validateEmail";

export default (() => {
  return [validateEmail()];
})();

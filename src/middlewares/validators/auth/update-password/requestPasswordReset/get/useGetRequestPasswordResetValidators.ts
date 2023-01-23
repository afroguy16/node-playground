import validateToken from "./validators/validateToken";

export default (() => {
  return [validateToken()];
})();

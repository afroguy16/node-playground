import validateAuthority from "./validators/validateAuthority";

export default (() => {
  return [validateAuthority()];
})();

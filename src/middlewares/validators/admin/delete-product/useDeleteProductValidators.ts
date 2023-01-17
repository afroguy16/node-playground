import validateAuthority from "../shared/validators/validateAuthority";

export default (() => {
  return [validateAuthority()];
})();

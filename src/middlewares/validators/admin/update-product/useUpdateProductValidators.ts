import validateDescription from "./validators/validateDescription";
import validateImageUrl from "./validators/validateImageUrl";
import validatePrice from "./validators/validatePrice";
import validateTitle from "./validators/validateTitle";

export default (() => {
  return [
    validateTitle(),
    validateImageUrl(),
    validatePrice(),
    validateDescription(),
  ];
})();

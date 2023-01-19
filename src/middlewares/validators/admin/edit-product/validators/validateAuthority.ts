import isUserAuthorisedToUpdate from "../custom-validators/isUserAuthorisedToUpdate";

export default (productUserId: string, userId: string, req) => {
  const path = "id";

  if (!isUserAuthorisedToUpdate(productUserId, userId)) {
    req.validator.setError(path, "Unauthorized");
    return false;
  }

  return true;
};

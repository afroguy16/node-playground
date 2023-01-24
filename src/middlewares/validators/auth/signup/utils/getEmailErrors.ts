import getEmailErrors from "../../../utils/get-email-errors";
import { EMAIL_UNAVAILABLE_ADDRESS } from "../../constants";
import isEmailUnique from "../custom-validators/isEmailUnique";

export default async (email: string) => {
  const errors: Array<string> = [];

  errors.push(...getEmailErrors(email));

  if (errors.length > 0) {
    return errors;
  }

  if (!(await isEmailUnique(email))) {
    errors.push(EMAIL_UNAVAILABLE_ADDRESS);
  }

  return errors;
};

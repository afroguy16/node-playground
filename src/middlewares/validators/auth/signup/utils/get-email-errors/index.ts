import User from "../../../../../../models/User";
import getEmailErrors from "../../../../utils/get-email-errors";
import { EMAIL_UNAVAILABLE_ADDRESS } from "../../../constants";

/**
 * Get the compliance errors of a given email against a set of defined validation rules
 *
 * @async
 * @param {string} email - The email value to test
 * @returns {Promise<Array<String>>}
 */
export default async (email: string): Promise<Array<string>> => {
  const errors: Array<string> = [];

  errors.push(...getEmailErrors(email));

  if (errors.length > 0) {
    return errors;
  }

  const user = await User.get({ email });
  if (user) {
    errors.push(EMAIL_UNAVAILABLE_ADDRESS);
  }

  return errors;
};

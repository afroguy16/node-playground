import { ERROR_CODE_UNPROCESSED_ENTITY } from "../../../../../controllers/utils/constants";
import { EMAIL_ERROR_MESSAGE_INVALID_TYPE } from "../../constants";
import getEmailErrors from "../../utils/getEmailErrors";

export default async (req, res, next) => {
  const email = req?.body?.email;
  const path = "email";

  if (!email) {
    return res.status(ERROR_CODE_UNPROCESSED_ENTITY).json([
      {
        path,
        message: EMAIL_ERROR_MESSAGE_INVALID_TYPE,
      },
    ]);
  }

  const errors = await getEmailErrors(email);

  if (errors.length > 0) {
    const errorsPayload: Array<{ path: string; message: string }> = [];
    errors.forEach((error) => errorsPayload.push({ path, message: error }));
    return res.status(ERROR_CODE_UNPROCESSED_ENTITY).json(errorsPayload);
  }

  next();
};

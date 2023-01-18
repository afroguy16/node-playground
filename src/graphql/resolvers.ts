import bcyrpt from "bcryptjs";
import { GraphQLError } from "graphql";

import EmailService from "../controllers/shared/services/EmailService";
import { OfficialEmailE } from "../controllers/shared/services/EmailService/enums";
import signupTemplate from "../controllers/shared/services/EmailService/templates/signupTemplate";
import useSignupValidators from "../middlewares/validators/auth/signup/useSignupValidators";
import User from "../models/User";

const getSignupErrorObject = (errors) => {
  const errorExtensions = { status: false, errors };
  return new GraphQLError(
    "Signup failed",
    null,
    null,
    null,
    null,
    null,
    errorExtensions
  );
};

const signup = async (args, req) => {
  const { username, email, password } = args.signupInputData;

  // TODO - Research a better design for this HACK - move the content of the arg.signupInputData to req.body so the validators (which were created for REST) would work with Graphql
  req.body = args.signupInputData;
  await useSignupValidators(req);

  const errors = req.validator.getErrors();

  if (req.validator.hasError()) {
    throw getSignupErrorObject(errors);
  }

  try {
    const salt = await bcyrpt.genSalt(12);
    const crypted = await bcyrpt.hash(password, salt);

    const response = await User.create({ email, password: crypted, username });

    EmailService.send({
      to: email,
      from: OfficialEmailE.SUPPORT,
      template: { ...signupTemplate },
    })
      .then()
      .catch((e) => console.log(e));

    return response;
  } catch (e) {
    console.log(e);
    throw getSignupErrorObject([{ path: "signup", message: e }]);
  }
};

export default {
  signup,
};

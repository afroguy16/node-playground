import bcyrpt from "bcryptjs";
import { GraphQLError } from "graphql";

import EmailService from "../controllers/shared/services/EmailService";
import { OfficialEmailE } from "../controllers/shared/services/EmailService/enums";
import signupTemplate from "../controllers/shared/services/EmailService/templates/signupTemplate";
import useSignupValidators from "../middlewares/validators/auth/signup/useSignupValidators";
import Product from "../models/Product";
import { ProductAttributes } from "../models/Product/interfaces";
import User from "../models/User";
import isAuth from "../middlewares/validators/auth/special/authenticate/validators/graphql.isAuth";

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

const addProduct = async (args, req) => {
  isAuth(req);
  const { title, description, price } = args;
  const imageUrl = req.file?.path;
  // const errors = validationResult(req);

  // if (!errors.isEmpty()) {
  //   return res
  //     .status(ERROR_CODE_UNPROCESSED_ENTITY)
  //     .json({ message: "Illegal content", error: errors.array() });
  // }

  const payload: Omit<ProductAttributes, "_id"> = {
    userId: req.jwt.userId,
    title,
    imageUrl: "fakeUrl",
    description,
    price,
  };

  try {
    return await Product.create(payload);
    // res
    //   .status(SUCCESS_CODE_CREATED)
    //   .json({ message: "Post created successfully" });
  } catch (e) {
    console.log("error", e);
    return { message: "Failed to upload", error: e };
    // res
    //   .status(ERROR_CODE_SERVER)
    //   .json({ message: "Failed to upload", error: e });
  }
};

export default {
  signup,
  addProduct,
};

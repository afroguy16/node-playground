import bcyrpt from "bcryptjs";

import EmailService from "../controllers/shared/services/EmailService";
import { OfficialEmailE } from "../controllers/shared/services/EmailService/enums";
import signupTemplate from "../controllers/shared/services/EmailService/templates/signupTemplate";
import useSignupValidators from "../middlewares/validators/auth/signup/useSignupValidators";
import Product from "../models/Product";
import { ProductAttributes } from "../models/Product/interfaces";
import User from "../models/User";
import isAuth from "../middlewares/validators/auth/special/authenticate/validators/graphql.isAuth";
import { createGraphQLErrorObject } from "./utils";
import useAddProductValidators from "../middlewares/validators/admin/add-product/useAddProductValidators";
import { ERROR_CODE_UNPROCESSED_ENTITY } from "../controllers/constants";

const signup = async (args, req) => {
  const { username, email, password } = args.signupInputData;

  // TODO - Research a better design for this HACK - move the content of the arg.signupInputData to req.body so the validators (which were created for REST) would work with Graphql
  req.body = args.signupInputData;
  await useSignupValidators(req);
  const errors = req.validator.getErrors();
  if (req.validator.hasError()) {
    throw createGraphQLErrorObject("Signup failed", errors);
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
    throw createGraphQLErrorObject("Signup failed", [
      { path: "signup", message: e },
    ]);
  }
};

const addProduct = async (args, req) => {
  isAuth(req);
  const { title, description, price } = args;
  const imageUrl = req.file?.path;

  useAddProductValidators(args, req);
  const errors = req.validator.getErrors();

  if (req.validator.hasError()) {
    throw createGraphQLErrorObject(
      "Illegal content",
      errors,
      ERROR_CODE_UNPROCESSED_ENTITY
    );
  }

  const payload: Omit<ProductAttributes, "_id"> = {
    userId: req.jwt.userId,
    title,
    imageUrl,
    description,
    price,
  };

  try {
    return await Product.create(payload);
  } catch (e) {
    console.log(e);
    throw createGraphQLErrorObject("Failed to add product", [
      { path: "addProduct", message: e },
    ]);
  }
};

export default {
  signup,
  addProduct,
};

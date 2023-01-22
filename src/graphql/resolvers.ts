import bcyrpt from "bcryptjs";

import EmailService from "../controllers/shared/services/EmailService";
import { OfficialEmailE } from "../controllers/shared/services/EmailService/enums";
import signupTemplate from "../controllers/shared/services/EmailService/templates/signupTemplate";
import useSignupValidators from "../middlewares/validators/auth/signup/useSignupValidators";
import Product from "../models/Product";
import { ProductAttributes } from "../models/Product/interfaces";
import User from "../models/User";
import isAuth from "../middlewares/validators/auth/authenticate/authenticators/graphql.isAuth";
import { createGraphQLErrorObject } from "./utils";
import useAddProductValidators from "../middlewares/validators/admin/add-product/useAddProductValidators";
import {
  DEFAULT_PAGE_NUMBER,
  ERROR_CODE_UNPROCESSED_ENTITY,
  ITEMS_PER_PAGE,
} from "../controllers/constants";
import useEditProductValidators from "../middlewares/validators/admin/edit-product/useEditProductValidators";

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
  isAuth("addProduct", req);
  const { title, description, price } = args;

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
    userId: req.userId,
    title,
    imageUrl: "fakeUrl",
    description,
    price,
  };

  try {
    return await Product.create(payload);
  } catch (e) {
    throw createGraphQLErrorObject("Failed to add product", [
      { path: "addProduct", message: e },
    ]);
  }
};

export const products = async (args) => {
  const { page } = args;
  try {
    const productCount = await Product.getAllProductsCount();
    const products = await Product.getAll({
      pagination: { page: page || DEFAULT_PAGE_NUMBER },
    });
    return (
      products && {
        currentPage: Number(page),
        pageCount: Math.ceil(productCount / ITEMS_PER_PAGE),
        products,
      }
    );
  } catch (e) {
    console.log(e);
    throw createGraphQLErrorObject("Failed to fetch products", [
      { path: "Products", message: e },
    ]);
  }
};

const editProduct = async (args, req) => {
  const { id, title, description, price } = args;

  isAuth("editProduct", req);
  await useEditProductValidators(args, req);
  const errors = req.validator.getErrors();

  if (req.validator.hasError()) {
    throw createGraphQLErrorObject(
      "Illegal content",
      errors,
      ERROR_CODE_UNPROCESSED_ENTITY
    );
  }

  try {
    const payload: ProductAttributes = {
      _id: id,
      ...(title && { title }),
      ...(description && { description }),
      ...(price >= 0 && { price }),
    };

    // TODO - ensure that you only send a success response when the DB is updated
    return await Product.update(payload);
  } catch (e) {
    throw createGraphQLErrorObject(
      "Illegal request",
      [{ path: "editProduct", message: e }],
      ERROR_CODE_UNPROCESSED_ENTITY
    );
  }
};

export default {
  signup,
  addProduct,
  editProduct,
  products,
};

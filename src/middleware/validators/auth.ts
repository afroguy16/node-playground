import { check } from "express-validator";

export const validateEmail = (message, customValidator) => {
  check("email").isEmail().withMessage(message);
};

export const isAcceptedEmailAddress = (value, { req }) => {
  if (value !== "test@test.com") {
    return true;
  }
  throw new Error("This email address isn't acceptable");
};

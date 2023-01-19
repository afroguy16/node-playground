import jwt from "jsonwebtoken";

export default (req) => {
  try {
    const token = req.get("Authorization").split(" ")[1];
    const decodedToken = jwt.verify(token, "this is some long ass ");
    req.jwt = { userId: decodedToken.userId };
    return true;
  } catch (e) {
    throw { message: "Not authorized", error: e };
  }
};

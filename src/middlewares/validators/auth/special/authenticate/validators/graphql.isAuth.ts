import isAuth from "../custom-validators/isAuth";

export default (req) => {
  try {
    return isAuth(req);
  } catch (e) {
    console.log(e);
  }
};

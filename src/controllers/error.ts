const pathName = "/404";
const pageTitle = "Page not found";

export const get404 = (req, res, next) => {
  res.status(404).render("404", {
    pageTitle,
    pathName,
    isLoggedIn: req.session.user?._id,
  });
};

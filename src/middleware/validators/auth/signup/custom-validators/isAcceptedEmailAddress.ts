export default (
  emailToCompare: string,
  invalidEmail: string,
  errorMessage: string
) => {
  if (emailToCompare !== invalidEmail) {
    return true;
  }
  throw new Error(errorMessage);
};

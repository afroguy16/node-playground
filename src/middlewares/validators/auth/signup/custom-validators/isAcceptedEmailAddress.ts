export default (
  emailToCompare: string,
  invalidEmails: Array<string>,
  errorMessage: string
) => {
  const isAcceptedAddress = !invalidEmails.includes(emailToCompare);
  if (isAcceptedAddress) {
    return true;
  }
  throw new Error(errorMessage);
};

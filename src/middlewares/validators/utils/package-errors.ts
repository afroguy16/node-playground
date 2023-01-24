export default (path: string, errors: Array<string>) => {
  const packagedErrors: Array<{ path: string; message: string }> = [];
  errors.forEach((error) => packagedErrors.push({ path, message: error }));
  return packagedErrors;
};

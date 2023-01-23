export default (emailToCompare: string, invalidEmails: Array<string>) =>
  !invalidEmails.includes(emailToCompare);

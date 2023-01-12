export default (token: string) => ({
  subject: "Password Reset",
  html: `
    <p>You requested a password reset</p>
    <p>Click this <a href="http://localhost:4000/reset/${token}">link</a> to set a new password.</p>
  `,
});

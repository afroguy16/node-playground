import sendGridTransport from "nodemailer-sendgrid-transport";

export default sendGridTransport({
  auth: {
    api_key: "",
  },
});

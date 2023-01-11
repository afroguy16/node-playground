import nodemailer from "nodemailer";

import { SendEmailMessageI } from "./interfaces";
import mailTrapTransport from "./transporters/mailTrapTransport";

const TRANSPORTER = nodemailer.createTransport(mailTrapTransport);

class EmailService {
  async send({ to, from, template }: SendEmailMessageI) {
    const { subject, html } = template;
    return TRANSPORTER.sendMail({ to, from, subject, html });
  }
}

export default new EmailService();

import { OfficialEmailE } from "./enums";

export interface SendEmailMessageI {
  to: string;
  from: OfficialEmailE;
  template: {
    subject: string;
    html: string;
  };
}

export interface EmailServiceI {
  send: (payload: SendEmailMessageI) => Promise<any>;
}

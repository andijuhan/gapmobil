import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export interface IMailConfig {
   service: string;
   user: string;
   pass: string;
}

export interface IMailOption {
   from: string;
   to: string;
   subject: string;
   text: string;
}

const emailSender = (
   { service, user, pass }: IMailConfig,
   { from, to, subject, text }: IMailOption
) => {
   return new Promise((resolve, reject) => {
      //config
      const transporter = nodemailer.createTransport({
         service,
         auth: {
            user,
            pass,
         },
      });
      //option
      const mailOption: IMailOption = {
         from,
         to,
         subject,
         text,
      };
      //send email
      transporter.sendMail(mailOption, (error, info) => {
         if (error) {
            console.log(error);
            reject(error);
         } else {
            console.log(info.response);
            resolve(true);
         }
      });
   });
};

export default emailSender;

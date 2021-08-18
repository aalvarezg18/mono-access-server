import transport from '../config/mail.config';
import BaseService from './_base.service';

class MailService extends BaseService {
  // Send email
  public sendMail = async (
    to: string,
    subject: string,
    text: string,
    html?: string,
    attachments?: { filename: string; path: string }[]
  ) => {
    const mailData = {
      from: process.env.NODEMAILER_USER,
      to,
      subject,
      text,
      html,
      attachments: attachments || undefined
    };
    // eslint-disable-next-line node/handle-callback-err
    try {
      return transport.sendMail(mailData, (error, info) => {
        if (error) console.error(error);
        console.log('Mail sent');
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export default MailService;

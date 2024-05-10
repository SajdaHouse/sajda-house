import nodemailer from "nodemailer";
import { string } from "zod";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import Mail from "nodemailer/lib/mailer";
const createTransporter = async () => {
  const transporter = nodemailer.createTransport({
    host:"smtp-relay.brevo.com",
    port:587,
    secure:false,
    auth:{
      user:"beatsagda@gmail.com",
      pass:"4J9g2dqAsfRKvn5p"
    }
  });

  return transporter;
};
export async function sendEmail(
  reciever: string,
  subject: string,
  content: string,
) {
  try {
    const emailTransporter = await createTransporter();
    if (emailTransporter) {
      await emailTransporter.sendMail({
        from: "beatsagda@gmail.com",
        to: reciever,
        subject: subject,
        html: content,
      });
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.error(err);
    return false;
  }
}

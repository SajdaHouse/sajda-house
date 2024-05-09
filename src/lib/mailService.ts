import nodemailer from "nodemailer";
const createTransporter = async () => {
  const transporter = nodemailer.createTransport({
    host:"smtp-relay.brevo.com",
    port:587,
    secure:false,
    auth:{
      user:"748f4a001@smtp-brevo.com",
      pass:"CQO0vr4EqP7ayGD1"
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
        from: "sajdahouse1@gmail.com",
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

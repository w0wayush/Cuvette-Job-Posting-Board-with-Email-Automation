import nodemailer, { Transporter, SentMessageInfo } from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

interface MailResponse {
  success: boolean;
  message: string;
  info?: SentMessageInfo;
}

const mailSender = async (
  email: string,
  title: string,
  body: string
): Promise<MailResponse> => {
  try {
    let transporter: Transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      secure: false,
    });

    let info: SentMessageInfo = await transporter.sendMail({
      from: `"Cuvette " <${process.env.MAIL_USER}>`, // sender address
      to: email, // list of receivers
      subject: title, // Subject line
      html: body, // html body
    });

    console.log("Message sent: %s", info.messageId);
    return {
      success: true,
      message: "Email sent successfully",
      info: info,
    };
  } catch (error) {
    console.error("Error in sending email:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
};

export default mailSender;

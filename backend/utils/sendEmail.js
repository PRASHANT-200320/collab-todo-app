import nodemailer from "nodemailer";

const sendEmail = async (to, subject, html) => {
  const { EMAIL_USER, EMAIL_PASS } = process.env;

  if (!EMAIL_USER || !EMAIL_PASS) {
    console.log("📭 Email not configured. Skipping email.");
    return; 
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: EMAIL_USER,
    to,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("📨 Email sent to", to);
  } catch (err) {
    console.error(" Failed to send email:", err.message);
  }
};

export default sendEmail;

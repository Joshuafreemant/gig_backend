import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  // Set up your email transport configuration
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // use SSL
  auth: {
    user: "tolexjoshua@gmail.com",
    pass: "xnac kxrm olkj hpoj",
  },
});
const sendResetEmail = (email, resetToken) => {
  const mailOptions = {
    from: "tolexjoshua@gmail.com",
    to: email,
    subject: "Password Reset",
    text: `Click the following link to reset your password: https://acoalumni.com/reset-password/${resetToken}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending reset email:", error);
    } else {
      console.log("Reset email sent:", info.response);
    }
  });
};
const sendWelcomeEmail = (email, name) => {
  const welcomeMessage = `
Dear ${name},
  
Congratulations on joining our esteemed alumni platform! We're thrilled to welcome you back to the [School Name] community. As a new member, you're now part of a vibrant network of accomplished individuals. Stay connected, share your experiences, and explore exciting opportunities. Your journey with Adesoye College Offa doesn't end here – it evolves. Here's to fostering meaningful connections and reliving cherished memories.
  
Best regards,
Adesoye College Offa Alumni Team`;

  const mailOptions = {
    from: "tolexjoshua@gmail.com",
    to: email,
    subject: "Welcome to Adesoye College Offa Alumni Community!",
    text: welcomeMessage,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending  email:", error);
    } else {
      console.log(" email sent:", info.response);
    }
  });
};

export { sendResetEmail, sendWelcomeEmail };

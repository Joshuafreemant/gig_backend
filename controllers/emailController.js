
import nodemailer from 'nodemailer';

const sendResetEmail = (email, resetToken) => {
  const transporter = nodemailer.createTransport({
    // Set up your email transport configuration
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'tolexjoshua@gmail.com',
        pass: 'xnac kxrm olkj hpoj'
    }
  });

  const mailOptions = {
    from: 'tolexjoshua@gmail.com',
    to: "joshuafreemant@gmail.com",
    subject: 'Password Reset',
    text: `Click the following link to reset your password: http://your-app/reset-password/${resetToken}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending reset email:', error);
    } else {
      console.log('Reset email sent:', info.response);
      
    }
  });
};

export { sendResetEmail };

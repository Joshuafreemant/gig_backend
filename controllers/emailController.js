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
    from: "Olusomi.Delano@gmail.com",
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
  
Congratulations on joining our esteemed alumni platform! We're thrilled to welcome 
you back to the Adesoye College Offa community. 
As a new member, you're now part of a vibrant network of accomplished individuals. 
Stay connected, share your experiences, and explore exciting opportunities. 
Your journey with Adesoye College Offa doesn't end here – it evolves. 
Here's to fostering meaningful connections and reliving cherished memories.
Kindly note that your account will go through the verification process for approval, once approved, an email would be sent to you.
  
Best regards,
Adesoye College Offa Alumni Team`;

  const mailOptions = {
    from: "Olusomi.Delano@gmail.com",
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

const sendActivateEmail = (email, name) => {
  const welcomeMessage = `
Dear ${name},
  
Congratulations, your profile has been acivated on Adesoye alumni platform!
  
Best regards,
Adesoye College Offa Alumni Team`;

  const mailOptions = {
    from: "Olusomi.Delano@gmail.com",
    to: email,
    subject: "Profile Approved - Adesoye College Offa Alumni Community!",
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

const sendNotificationEmail = (emails, name, set) => {
  const welcomeMessage = `
Hello Admin,
  
a new user named ${name} in (${set}) set has just signed in. Stay informed about the latest activities on the platform.
Log in to the admin panel to activate their account for them to get started. 
Thank you for your continuous support and dedication to our community.`;

  // Loop through each email address and send the welcome email
  emails.forEach((email) => {
    const mailOptions = {
      from: "Olusomi.Delano@gmail.com",
      to: email,
      subject: "New Registration Alert - Adesoye College Offa Alumni",
      text: welcomeMessage,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(`Error sending email to ${email}:`, error);
      } else {
        console.log(`Email sent to ${email}:`, info.response);
      }
    });
  });
};


export { sendResetEmail, sendWelcomeEmail,sendNotificationEmail,sendActivateEmail };

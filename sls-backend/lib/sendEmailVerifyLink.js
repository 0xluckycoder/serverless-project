const { sign } = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');

module.exports = sendEmailVerifyLink = (user) => {
    return new Promise( async (resolve) => {
  
      const emailToken = sign({userId: user._id}, 'emailSecret', { expiresIn: '1d' });
      const url = `http://localhost:3000/dev/posts/confirmation/${emailToken}`;
  
      const mailTemplate = {
        to: user.email,
        from: 'Hotboxes.lk@gmail.com',
        subject: 'hotbox.lk Email verification',
        text: 'this is the text',
        html: `<strong>this is strong text</strong><a href="${url}">${url}</a>`,
      }
  
      sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
  
      try {
        await sgMail.send(mailTemplate);
        resolve();
      } catch(error) {
        console.log('email error', error);
      }
    });
}
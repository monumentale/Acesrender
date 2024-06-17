// Server-side logic (Node.js)
const express = require('express');
const app = express();
const admin = require('firebase-admin');
const cors = require('cors'); 
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
var serviceAccount = require("./acesbinarytrades-firebase-adminsdk-w65z3-a6af80ebc3.json");
let PORT = process.env.PORT || 5000

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://acesbinarytrades-default-rtdb.firebaseio.com"
});



app.post('/send-mail', async (req, res) => {
  try {
    console.log(req.body);
    const { user, pass, htmlToSend, email, subject } = req.body;

    // Validate user and password (replace with your validation logic)
    // if (!user || !pass || !isValidCredentials(user, pass)) {
    //   return res.status(401).json({ message: 'Invalid credentials' });
    // }

    const transporter = nodemailer.createTransport({
      host: 'mail.privateemail.com',
      port: 25,
      secure: false,
      // port: 465,
      // secure: true,
      auth: {
        user:"support@gravityfinances.com",
        pass:"gravityfinemail100"
      },
      // tls: {
      //   rejectUnauthorized: false // This can be useful for development, but should be avoided in production
      // }
    });

    const mailOptions = {
      from:`Gravityfinances <support@gravityfinances.com>`,
      to: email,
      subject:subject,
      html: `${htmlToSend}`
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    res.json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error occurred:', error.message);
    console.error('Full error:', error);
    res.status(500).json({ message: 'Error sending email' });
  }
});

// Replace this with your actual user and password validation logic
function isValidCredentials(user, pass) {
  // Implement your authentication logic here
  // This example always returns true for demonstration purposes
  return true;
}



app.delete('/api/deleteUser/:uid', async (req, res) => {
  const uid = req.params.uid;

  try {
    await admin.auth().deleteUser(uid);
    res.status(200).send('User deleted successfully');
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).send('Error deleting user');
  }
});



// Your React app can make a DELETE request to /api/deleteUser/:uid
// Start the server
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Listen in in the port ${PORT}`);
});

  
// Server-side logic (Node.js)
const express = require('express');
const app = express();
const admin = require('firebase-admin');
const cors = require('cors'); 

app.use(cors());
var serviceAccount = require("./acesbinarytrades-firebase-adminsdk-w65z3-a6af80ebc3.json");
let PORT = process.env.PORT || 5000

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://acesbinarytrades-default-rtdb.firebaseio.com"
});
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

  
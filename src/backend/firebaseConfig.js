const admin = require('firebase-admin');
const serviceAccount = require('./firebase-adminsdk.json');  // Adjust path to match your JSON file location

// Initialize the Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'your-project-id.appspot.com',  // Replace 'your-project-id' with your Firebase project ID
});

// Firestore database instance
const db = admin.firestore();

// Firebase Storage instance for file uploads
const bucket = admin.storage().bucket();

// Export the Firestore database and Storage bucket for use in other files
module.exports = { db, bucket };

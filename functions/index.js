const functions = require('firebase-functions');
// needed to access firestore
const admin = require('firebase-admin');
admin.initializeApp();

// Cloud function
// takes two params data sent to the function and context of the returns
exports.checkAlias = functions.https.onCall((data, context) => {
  const ref = admin.firestore().collection('users').doc(data.slug);

  return ref.get().then(doc => {
    // if doc exists, then unique is falsey
    // else unique is truthy
    return { unique: !doc.exists };
  }).catch(err => {
    throw new functions.https.HttpsError('failed to connect');
  });
})

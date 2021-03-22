const functions = require('firebase-functions');

const admin = require('firebase-admin')
const db = admin.firestore()

exports.getStats = functions.https.onCall((data, context) => {
  const ref = db.collection('tentatives')
  return ref.get()
    .then((querySnapshot) => {
      const score = 0
      querySnapshot.forEach((doc) => {
        score+=doc.data().score
      });
      return score
    })
    .catch((error) => {
      console.log('Error getting documents: ', error);
    });
})

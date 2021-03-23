const functions = require('firebase-functions');
const admin = require('firebase-admin')
const db = admin.firestore()

exports.getStats = functions.https.onCall((data, context) => {
  const stats = {
  }
  db.collection('tentatives').get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        stats.score += doc.data().score
        //result.score+=1
      });
      return stats
    })
    .catch((error) => {
      console.log('Error getting documents: ', error);
    });
})

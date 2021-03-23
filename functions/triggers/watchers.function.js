const functions = require('firebase-functions');
const admin = require('firebase-admin')
const db = admin.firestore()

exports.watchTentatives = functions.firestore.
  document('tentatives/{tentativeId}')
  .onCreate((snapshot) => {
    const batch = db.batch();
    const data = snapshot.data()

    db.collection('tentatives')
      .where('idPatient', '==', data.idPatient)
      .where('idParcours', '==', data.idParcours)
      .where('dateTime', '!=', data.dateTime)
      //.delete()
      .get()
      .then(docrefs => {
        docrefs.forEach(doc => batch.delete(doc.ref));
        batch.commit();
      })
  })

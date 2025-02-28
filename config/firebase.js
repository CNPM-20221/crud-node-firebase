const admin = require('firebase-admin')
const serviceAccount = require('./creds.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://${serviceAccount.project_id}.firebaseio.com',
})

const db = admin.firestore()

module.exports = { admin, db }
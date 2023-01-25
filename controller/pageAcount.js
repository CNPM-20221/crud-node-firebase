

const {db} = require('../config/firebase');

module.exports.pageAccount = async (req, res) => {
  try {
    const allEntries = [];
    const querySnapshot = await db.collection('account').orderBy("username")
    .startAt(0).limit(3).get();
    querySnapshot.forEach( (doc) => allEntries.push(doc.data()));
    return res.status(200).json(allEntries);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

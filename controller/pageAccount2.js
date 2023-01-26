const {db} = require('../config/firebase');
module.exports.pageAccount2 = async (req, res) => {
    try {
      const allEntries = [];
      const querySnapshot = await db.collection('account').orderBy("username")
      .startAt(4).limit(4).get()
      querySnapshot.forEach( (doc) => allEntries.push(doc.data()));
      return res.status(200).json(allEntries);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  };
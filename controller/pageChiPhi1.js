const {db} = require('../config/firebase');
module.exports.pageChiPhi1 = async (req, res) => {
    try {
      const allEntries = [];
      const querySnapshot = await db.collection('chiphi').orderBy("fullname")
      .startAt(0).limit(4).get()
      querySnapshot.forEach( (doc) => allEntries.push(doc.data().username));
      return res.status(200).json(allEntries);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  };
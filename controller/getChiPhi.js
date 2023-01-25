const {db} = require('../config/firebase');

module.exports.getChiPhi = async (req, res) => {
  try {
    const allEntries = [];
    const querySnapshot = await db.collection('chiphi').get();
    querySnapshot.forEach( (doc) => allEntries.push(doc.data()));
    return res.status(200).json(allEntries);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};


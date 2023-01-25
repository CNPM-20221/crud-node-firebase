const {db} = require('../config/firebase');

module.exports.getHoKhau = async (req, res) => {
  try {
    const allEntries = [];
    const querySnapshot = await db.collection('hokhau').get();
    querySnapshot.forEach( (doc) => allEntries.push(doc.data()));
    return res.status(200).json(allEntries);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};


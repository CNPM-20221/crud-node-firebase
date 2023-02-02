const {db} = require('../config/firebase');

module.exports.addChiPhi = async (req, res) => {
  const {name,chiphi,date,ghichu} = req.body;
  try {
    const entry = db.collection('chiphi').doc();
    const ChiphiObject = {
      id :entry.id,
      name,
      chiphi,
      date,
      ghichu
    };
      
      entry.set(ChiphiObject);
        res.status(200).send({
          status: 'success',
          message: 'ChiPhi added successfully !',
          data: ChiphiObject,
        });
  } catch (error) {
    res.status(500).json(error.message);
  }
}

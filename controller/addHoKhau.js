const {db} = require('../config/firebase');

module.exports.addHoKhau = async (req, res) => {
  const {idChuho,sothanhvien,diachi} = req.body;
  try {
    const entry = db.collection('hokhau').doc();
    const peopleObject = {
      maho :entry.id,
      sothanhvien,
      diachi,
      idChuho

    };
      
      entry.set(peopleObject);
        res.status(200).send({
          status: 'success',
          message: 'HoKhau added, register successfully !',
          data: peopleObject,
        });
  } catch (error) {
    res.status(500).json(error.message);
  }
}
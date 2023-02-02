const {db} = require('../config/firebase');

module.exports.addHoKhau = async (req, res) => {
  const {idChuho,sothanhvien,diachi} = req.body;
  try {
    const entry = db.collection('hokhau').doc();
    const ChuhoObject = {
      maho :entry.id,
      sothanhvien,
      diachi,
      idChuho

    }
      
      entry.set(ChuhoObject);
        res.status(200).send({
          status: 'success',
          message: 'HoKhau added successfully !',
          data: ChuhoObject,
        });
  } catch (error) {
    res.status(500).json(error.message);
  }
}
const {db} = require('../config/firebase');

module.exports.updateHoKhau = async (req, res) => {
  const {tenchuho,sothanhvien,diachi} = req.body;
  try {
    const peopleObject = {
        maho: req.params.id,
        tenchuho,
        sothanhvien,
        diachi
      };
    const response = await db.collection('hokhau').doc(req.params.id);
    response.set(peopleObject,{merge:true});
    res.status(200).send({
        status: 'success',
        message: 'Update success !',
        data: peopleObject,
      });
  } catch (error) {
    res.status(500).json(error.message);
  }
}
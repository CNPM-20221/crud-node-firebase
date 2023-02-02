const {db} = require('../config/firebase');

module.exports.addNhanKhau = async (req, res) => {
  const {name,chuHo,phone,date,age,gender,identify,address,status} = req.body;
  try {
    const entry = db.collection('nhankhau').doc();
    const peopleObject = {
      id :entry.id,
      name,
      chuHo,
      age,
      phone,
      maho:"",
      date,
      gender,
      identify,
      address,
      status
    }
    if (chuHo==true) {
      const dbquery = db.collection('hokhau').doc()
      const ChuhoObject = {
        maho :dbquery.id,
        sothanhvien:"",
        diachi:"",
        idChuho: entry.id
      }
      dbquery.set(ChuhoObject);
      entry.set(peopleObject);
        res.status(200).send({
          status: 'success',
          message: 'Nhan khau added, register successfully !',
          data: peopleObject,
        });
    }
    else {
      entry.set(peopleObject);
        res.status(200).send({
          status: 'success',
          message: 'Nhan khau added, register successfully !',
          data: peopleObject,
        });
    }
      
  } catch (error) {
    res.status(500).json(error.message);
  }
}
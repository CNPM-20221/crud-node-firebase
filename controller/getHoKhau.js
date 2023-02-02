const {db} = require('../config/firebase');
const size = 1

module.exports.hokhau_pagination = async (req, res, next) => {
    try{
      let n_cursor = req.query.nextCursor
      let size = parseInt(req.query.size)
      let total_size
      db.collection('hokhau').get()
                        .then((querySnapshot) => {total_size = querySnapshot.size})
      console.log(total_size)
      const list_hokhau = []
      if (n_cursor) {
        console.log(n_cursor);
        const querydb = await db.collection('hokhau').orderBy('idChuho')
                                .startAt(n_cursor)
                                .limit(size+1)
                                .get()
        querydb.forEach((doc) => list_hokhau.push(doc.data()))
      }
      else {
        const querydb = await db.collection('hokhau').orderBy('idChuho')
                                .limit(size+1)
                                .get()
        querydb.forEach((doc) => list_hokhau.push(doc.data()))
      }
      return res.status(200).json({
        data: list_hokhau.slice(0,size),
        nextCursor: list_hokhau[size].id,
        size: size,
        total_size: total_size   
      })
      } 
    catch(error){
        return res.status(500).json(error.message);
      } 
  }

  module.exports.thanhvienhokhau = async (req,res,next) => {
    try {
      const id_hokhau = req.params.id
      const dbquery = await db.collection('hokhau').doc(id_hokhau)
                              .get()
      const hokhau = dbquery.data()
      const maho = hokhau.maho
      const all_match = []
      const nhankhauquery = await db.collection('nhankhau')
                                    .where('maho','==',maho)
                                    .get()
                                    .then((querySnapshot) => {
                                      querySnapshot.forEach((doc) => {
                                        all_match.push(doc.data())
                                      })
                                      sothanhvien = querySnapshot.size 
                                    })
      return res.status(200).json({
        hokhau:hokhau,
        nhankhau: all_match,
        sothanhvien: sothanhvien
      })
    }
    catch (error) {
        return res.status(500).json(error.message)
    }
  }
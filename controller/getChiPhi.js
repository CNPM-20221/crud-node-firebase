const {db} = require('../config/firebase');
const size = 1

module.exports.chiphi_pagination = async (req, res, next) => {
    try{
      let n_cursor = req.query.nextCursor
      let size = parseInt(req.query.size)
      let total_size
      db.collection('chiphi').get()
                        .then((querySnapshot) => {total_size = querySnapshot.size})
      console.log(total_size)
      const list_chiphi = []
      if (n_cursor) {
        const querydb = await db.collection('chiphi').orderBy('id')
                                .startAt(n_cursor)
                                .limit(size+1)
                                .get()
        querydb.forEach((doc) => list_chiphi.push(doc.data()))
      }
      else {
        const querydb = await db.collection('chiphi').orderBy('id')
                                .limit(size+1)
                                .get()
        querydb.forEach((doc) => list_chiphi.push(doc.data()))
      }
      return res.status(200).json({
        data: list_chiphi.slice(0,size),
        nextCursor: list_chiphi[size] ? list_chiphi[size].id : undefined,
        size: size,
        total_size: total_size   
      })
      } 
    catch(error){
        return res.status(500).json(error.message);
      } 
  }
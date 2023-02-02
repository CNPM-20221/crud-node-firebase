const express = require('express')
const { FieldValue } = require('firebase-admin/firestore')
const app = express()
const cors = require('cors');
const port = 8383
const cookieParser = require('cookie-parser')
const { db } = require('./config/firebase.js')
// Import add fuction
const {addAccount} = require('./controller/addAccount');
const {login} = require('./controller/login')
const {logout} = require('./controller/logout')
const {addChiPhi} = require('./controller/addChiPhi')
const {addNhanKhau} = require('./controller/addNhanKhau')
const {addHoKhau} = require('./controller/addHoKhau')

const {addTestNhanKhau} = require('./controller/addTestNhanKhau')
// Import get function
const {chiphi_pagination} = require('./controller/getChiPhi')
const {hokhau_pagination} = require('./controller/getHoKhau')
const {nhankhau_pagination} = require('./controller/getNhanKhau');
const {getAllAccount, account_pagination} = require('./controller/getAccount')

const {getOneChiPhi} = require('./controller/getOneChiPhi')
const {getOneNhanKhau} = require('./controller/getOneNhanKhau')
const {getOneHoKhau}  = require('./controller/getOneHoKhau')

const {getTestOneNhanKhau} = require('./controller/getTestOneNhanKhau')

// Import detele fuction
const {deleteChiPhi} =require('./controller/deleteChiPhi')
const {deleteHoKhau} =require('./controller/deleteHoKhau')
const {deleteNhanKhau} = require('./controller/deleteNhanKhau')
const {deleteAccount} =require('./controller/deleteAccount')
// Import update function
const {updateAccount} = require('./controller/updateAcount')
const {updateChiPhi} = require('./controller/updateChiPhi')
const {updateHoKhau} = require('./controller/updateHoKhau')
const {updateNhanKhau} = require('./controller/updateNhanKhau')
//Import middleware function
const {checkLogin} = require('./middleware/checkLogin')

app.use(express.json())
app.use(cookieParser())
app.use(cors())

// Stuff
app.get('/health', (req, res) => {
    return res.status(200).json({
        message: 'Ok healthy'
    });
})
app.get('/login', (req,res) => {
    res.json("This is login page. Please login to continue!")
})

// GET Method

app.get('/allpeople', getAllAccount)
app.get('/pageaccount', account_pagination)
app.get('/pagechiphi',chiphi_pagination)
app.get('/pagehokhau',hokhau_pagination)
app.get('/pagenhankhau',nhankhau_pagination)

app.get('/get1chiphi/:id',getOneChiPhi)
app.get('/get1nhankhau/:id',getOneNhanKhau)
app.get('/get1hokhau/:id',getOneHoKhau)

app.get('/gettest1nhankhau/:id',getTestOneNhanKhau)

// POST Method

app.post('/register', addAccount)
app.post('/addchiphi',checkLogin, addChiPhi)
app.post('/addnhankhau',checkLogin, addNhanKhau)
app.post('/addhokhau',checkLogin, addHoKhau)
app.post('/login', login)
app.post('/logout', checkLogin, logout)

app.post('/addtestnhankhau',addTestNhanKhau)
// PUT Method
app.put('/updateaccount/:id',updateAccount)
app.put('/updateChiPhi/:id',updateChiPhi)
app.put('/updateHoKhau/:id',updateHoKhau)
app.put('/updateNhanKhau/:id',updateNhanKhau)


// DELETE Method
app.delete('/deletechiphi/:id',deleteChiPhi)
app.delete('/deletehokhau/:id',deleteHoKhau)
app.delete('/deletenhankhau/:id',deleteNhanKhau)
app.delete('/deleteaccount/:id',deleteAccount)


//Start server
app.listen(port, () => console.log(`Server has started on port: ${port}`))
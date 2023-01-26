const express = require('express')
const { FieldValue } = require('firebase-admin/firestore')
const app = express()
const port = 8383
const { db } = require('./config/firebase.js')
const {addAccount} = require('./controller/addAccount');
const {getAllAccount} = require('./controller/getAccount')
const {login} = require('./controller/login')
const {addChiPhi} = require('./controller/addChiPhi')
const {addNhanKhau} = require('./controller/addNhanKhau')
const {addHoKhau} = require('./controller/addHoKhau')
const {getChiPhi} = require('./controller/getChiPhi.js')
const {getHoKhau} = require('./controller/getHoKhau.js')
const {getNhanKhau} = require('./controller/getNhanKhau.js')
const {pageChiPhi1} = require('./controller/pageChiPhi1')
const {pageChiPhi2} = require('./controller/pageChiPhi2')
const {pageChiPhi3} = require('./controller/pageChiPhi3')
const {pageChiPhi4} = require('./controller/pageChiPhi4')
const {pageAccount1} = require('./controller/pageAccount1')
const {pageAccount2} = require('./controller/pageAccount2')
app.use(express.json())

app.get('/health', (req, res) => {
    return res.status(200).json({
        message: 'Ok healthy'
    });
})

// GET Method
app.get('/allpeople', getAllAccount)

app.get('/login', login)
        // Get page chi phi
app.get('/allchiphi',getChiPhi)
        app.get('/pagechiphi1',pageChiPhi1)
        app.get('/pagechiphi2',pageChiPhi2)
        app.get('/pagechiphi3',pageChiPhi3)
        app.get('/pagechiphi4',pageChiPhi4)

app.get('/allnhankhau',getNhanKhau)

app.get('/allhokhau',getHoKhau)

app.get('/pageAccount1',pageAccount1)
app.get('/pageAccount2',pageAccount2)

// POST Method
app.post('/addpeople', async (req, res) => {
    const { name, status } = req.body
    const peopleRef = db.collection('people').doc('associates')
    const res2 = await peopleRef.set({
        [name]: status
    }, { merge: true })
    // friends[name] = status
    res.status(200).send(friends)
})

app.post('/register', addAccount)
app.post('/addchiphi',addChiPhi)
app.post('/addnhankhau',addNhanKhau)
app.post('/addhokhau',addHoKhau)

// DELETE Method

app.delete('/friends', async (req, res) => {
    const { name } = req.body
    const peopleRef = db.collection('people').doc('associates')
    const res2 = await peopleRef.update({
        [name]: FieldValue.delete()
    })
    res.status(200).send(friends)
})

app.listen(port, () => console.log(`Server has started on port: ${port}`))
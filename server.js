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
const {pageAccount} = require('./controller/pageAcount')
app.use(express.json())

app.get('/health', (req, res) => {
    return res.status(200).json({
        message: 'Ok healthy'
    });
})

// GET Method
app.get('/allpeople', getAllAccount)

app.get('/login', login)

app.get('/allchiphi',getChiPhi)

app.get('/allnhankhau',getNhanKhau)

app.get('/allhokhau',getHoKhau)

app.get('/page1',pageAccount)


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
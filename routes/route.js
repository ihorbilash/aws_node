
const express = require('express')

const {gets,create,update,del} = require('../controllers/item')
const { login, logout, register } = require('../controllers/user')
const router = express.Router();




router.post('/login',  login)
router.post('/register', register)
router.post('/logout', logout)

router.route('/items')
.get(gets)
.post(create)
.put(update)
.delete(del)


module.exports = router;
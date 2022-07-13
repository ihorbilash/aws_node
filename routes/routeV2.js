const express = require('express')

const { gets, create, update, del } = require('../controllers/item')
const { login, logout, register } = require('../controllers/user')
const router = express.Router();

const choseFunction = {
   "getItems": gets,
   "register": register,
   "login": login,
   "logout": logout,
   "createItem": create,
   "editItem": update,
   "deleteItem": del
}

router.route('/router').all((req, res) => {
      try {
         choseFunction[req.query.action](req, res);
      } catch (e) {
         console.log("Someting wrong=>>", e)
      }
   })

module.exports = router
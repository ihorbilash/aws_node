
const UserSchema = require('../model/model')


async function login(req, res) {
    const { login, pass } = req.body
    const user = await UserSchema.findOne({ login, pass })
    if (user) {
        req.session.user_id = user._id
        res.send({ "ok": true })
    } else {
        return res.status(400).json({ error: "not found" })

    }
  }




async function register(req, res) {

    const { login, pass } = req.body

    let user = await UserSchema.findOne({ login, pass })
   
    if (user) {
        res.status(400).json({ error: "bad request" })
    } else {
        const newUser = new UserSchema({ login: login, pass: pass, items: [] })
        await newUser.save()
        res.json({ "ok": true })
    }
}


async function logout(req, res) {

    req.session.destroy;
    res.json({ "ok": true })
}

module.exports = { login, logout, register }
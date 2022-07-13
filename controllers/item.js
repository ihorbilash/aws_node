
const UserSchema = require('../model/model')


async function gets(req, res) {

    try {
        if (!req.session.user_id) {
            res.status(400).json({ error: "forbidden" })
        } else {
            const id = req.session.user_id;
            let user = await UserSchema.findById(id)
            res.json({ items: user["items"] })
        }

    } catch (e) {
        res.status(500).json(e);
    }
}

async function create(req, res) {

    try {
        const { text } = req.body
        const user_id = req.session.user_id
        let user = await UserSchema.findById(user_id)
        const item_id = await user.addItem(text)
        res.json({ _id: item_id });
    } catch (e) {
        res.status(500).json(e);
    }

}

async function update(req, res) {
    try {
        const user_id = req.session.user_id
        const { text, checked, _id } = req.body
        const user = await UserSchema.findById(user_id)
        await user.updateItem(text, checked, _id)

        res.json({ "ok": true })
    } catch (e) {
        res.status(500).json(e);
    }
}

async function del(req, res) {
    try {
        const { _id } = req.body
        const user = await UserSchema.findById(req.session.user_id)
        await user.delItem(_id)
        res.json({ "ok": true })

    } catch (e) {
        res.status(500).json(e);
    }
}


module.exports = { gets, create, update, del }; 
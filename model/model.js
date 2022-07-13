const { Schema, model } = require('mongoose')


const mySchema = new Schema({

    login: { type: String, required: true },
    pass: { type: String, required: true },
    items: [{
        text: { type: String, required: true },
        checked: { type: Boolean, required: false }
    },
    ]
})

mySchema.methods.addItem = async function (text) {
    this.items.push({ text })
    await this.save()
    const item_id = this.items[this["items"].length - 1]._id.toString();
    return item_id;
}

mySchema.methods.updateItem = async function (text, checked, _id) {
    this.items = this.items.map(item => {
        if (item._id.toString() === _id) {
            item = { text, checked }
        }
        return item;
    });
    await this.save();
}

mySchema.methods.delItem = async function (_id) {
    this.items = this.items.filter(item => {
        if (item._id.toString() !== _id) {
            return item;
        }

    });

    await this.save();
}


module.exports = model('UserSchema', mySchema)



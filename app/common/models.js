const mongoose = require('mongoose');


const contactSchema = mongoose.Schema({
    name: String,
    subject: String,
    message: String,
    email: String
});


const ContactModel = mongoose.model('ContactModel', contactSchema);

module.exports = {ContactModel: ContactModel};

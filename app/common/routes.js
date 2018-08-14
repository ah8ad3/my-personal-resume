const express = require('express');
const router = express.Router();

const transporter = require('../../lib/maile');

const {ContactModel} = require('./models');


router.get('/', function(req, res) {
    res.statusCode = 200;
    res.render('common/index');
});

router.post('/contact', function (req, res) {
    let name, subject, email, message;
    try{
        name = req.body.name;
        subject = req.body.subject;
        email = req.body.replyto;
        message = req.body.message;
    } catch(e){
        res.status(400).send();
    }
    if (!name){
        res.json({'validate': 'name is required'});
    }
    if (!subject){
        res.json({'validate': 'subject is required'});
    }
    if (!email){
        res.json({'validate': 'email is required'});
    }
    if (!message){
        res.json({'validate': 'message is required'});
    }
    let contact = new ContactModel();

    contact.email = email;
    contact.name = name;
    contact.message = message;
    contact.subject = subject;

    contact.save(function(err){
        if (err){
            res.send(err);
        }
    });

    let mailOption = {
        from: process.env.EMAIL_FROM,
        to: process.env.EMAIL_TO,
        subject: 'contact site: '+subject,
        html: `<h2>name: ${name} </h2> <p>input message is: ${message}</p><br><hr> <p>from mail: ${email}</p>`
    };

    transporter.sendMail(mailOption, function(err){
        if(err){
            res.redirect('/');
        }
    });

    res.redirect('/');
});

module.exports = router;

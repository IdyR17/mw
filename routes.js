const router = require('express').Router();
const mongoose = require('mongoose');

const mailer = require('./mailer');
const models = require('./models');

models.Email.remove({}, function(err) {
    if (err) console.log(err);
    else console.log('Table Email dropped!')
})

router.get('/forum', function(req, res) {
    res.redirect('localhost:4567');
});

router.post('/contactus', function(req, res) {
    var mailOpts = req.body;

    var contact = new models.Contact({
        name: mailOpts.name,
        email: mailOpts.email,
        message: mailOpts.message
    }).save(function(err, contact) {
        console.log(contact);
        console.log(err);

        var text = mailOpts.purpose ?
            "Thanks " + mailOpts.name + " for suscribing. We will send you an email when your product is available" :
            "Thanks " + mailOpts.name + " for contacting us! We will stay in touch!";

        mailer.sendEmail({
            to: mailOpts.email,
            subject: "Thanks " + mailOpts.name + " for contacting us! <Hydroponics Team>",
            from: "GrowItIn Inc. <growitin@jurhidy.com>",
            text: text,
        }, function(err) {
            console.log(err);
            if (err) return res.send('it failed');
            return res.send(mailOpts.message);
        });

        mailer.sendEmail({
            to: 'growitin@jurhidy.com',
            subject: 'Message sent from: ' + mailOpts.name,
            from: mailOpts.email,
            text: `
                From ${ mailOpts.name }: 
                    ${ mailOpts.message }
            `,
        }, function(err){
            //
        });
    });
    // Do the mailer thingy in here
});

router.post('/suscribe', function(req, res) {
    if(!req.body.email) return res.send('Didn\'t work');
    // ========================================
    // check if purpose is buy 
    //
    // check if purpose is diy
    // ========================================
    const email = new models.Email({
        email: req.body.email
    }).save(function(err, _) {
        if (err) return res.send('Didn\'t work');
        return res.send('suscribed!');
    });
});

module.exports = router;
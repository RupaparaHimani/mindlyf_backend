Contact = require('../Model/userModel');
const knexConfig = ('../../index');
// const knex = require('knex')({
//     client: 'mysql',
//     connection: {
//       host: "localhost",
//       user: "root",
//       password: "KN<MS5JA~X0oaSqF",
//       database : 'mindlyfa_mindlyftest'
//     }
//   });

const knex = require('knex')({
    client: 'mysql',
    connection: {
        host : 'localhost',
        user : 'root',
        password : 'root',
        database : 'mindlyf'
    }
  });

// Handle index actions
exports.index = function (req, res) {
    knex.select()
      .from('t_user')
    //   .where({email: 'arnab@omnicuris.com'})
      .withSchema()
      .then((response)=>{
        res.json({
            message: 'All users fetched!',
            data: response
        });
      });
};
// Handle create contact actions
exports.new = function (req, res) {
    var contact = new Contact();
    contact.name = req.body.name ? req.body.name : contact.name;
    contact._id = req.body.id;
    contact.email = req.body.email;
    contact.phone = req.body.phone;
    contact.role = req.body.role;
    contact.save(function (err) {
        if (err)
            res.json(err);
        res.json({
            message: 'New contact created!',
            data: contact
        });
    });
};
// Handle view contact info
exports.view = function (req, res) {
    Contact.findById(req.params.contact_id, function (err, contact) {
        if (err)
            res.send(err);
        res.json({
            message: 'Contact details loading..',
            data: contact
        });
    });
};
// Handle update contact info
exports.update = function (req, res) {
Contact.findById(req.params.contact_id, function (err, contact) {
        if (err)
            res.send(err);
contact.name = req.body.name ? req.body.name : contact.name;
        contact.gender = req.body.gender;
        contact.email = req.body.email;
        contact.phone = req.body.phone;
// save the contact and check for errors
        contact.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Contact Info updated',
                data: contact
            });
        });
    });
};
// Handle delete contact
exports.delete = function (req, res) {
    Contact.deleteOne({
        _id: req.params.contact_id
    }, function (err, contact) {
        if (err)
            res.send(err);
    res.json({
            status: "success",
            message: 'Contact deleted'
        });
    });
};

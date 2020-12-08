const { sendMail } = require('../Utils/email')

const knex = require('knex')({
    client: 'mysql',
    connection: {
      host: "localhost",
      user: "root",
      password: "KN<MS5JA~X0oaSqF",
      database : 'mindlyfa_mindlyftest'
    }
});

// const knex = require('knex')({
//     client: 'mysql',
//     connection: {
//         host : 'localhost',
//         user : 'root',
//         password : 'password',
//         database : 'mindlyf'
//     }
//   });

exports.email = function (req, res) {
    sendMail(req.body.email, req.body.subject,req.body.text, req.body.html)
    .then(() => {
        res.json({
            message: 'Email send',
        });
    }).catch ((err) => {
        return res.status(500).json({
            message: "Error while sending mail",
            error: err.message
        });
    });
};

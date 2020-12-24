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
        password : 'password',
        database : 'mindlyf'
    }
  });

exports.get_bills = function (req, res) {
  console.log("get Bills");
  knex.select()
    .from('t_orders')
    .then((response)=>{
      res.json({
          message: 'fetched paid programs',
          data: response
      });
    });
};

exports.remaining_bill_patient_list = function (req, res) {
  console.log("get remaining_bill_patient_list");
  knex.select('id', 'patientID')
    .from('t_orders')
    .where({amount: 0})
    .then((response)=>{
      res.json({
          message: 'fetched remaining_bill_patient_list',
          data: response
      });
    });
};

exports.get_bill_bumber = function (req, res) {
  console.log("get get_bill_bumber");
  knex.select('id', 'serviceID', 'programID', 'testID', 'amount')
    .from('t_orders')
    .where({userID: req.query.user_id})
    .then((response)=>{
      res.json({
          message: 'fetched remaining_bill_patient_list',
          data: response
      });
    });
};

exports.generate_bill = function (req, res) {
  console.log("get generate_bill");
  knex.select()
    .from('t_orders')
    .where({id: req.body.id})
    .update({
      amount: req.body.amount
    })
    .then((response)=>{
      knex('t_bill_payments').insert({orderID: req.body.id, amount: req.body.amount, created_date: new Date()})
      .then((response)=>{
          console.log(response);
        })
      .catch((err) => {
              console.log(err);
          })
    }).catch((err) => {
        console.log(err);
    })
};

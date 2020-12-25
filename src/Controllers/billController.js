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

exports.getBills = function (req, res) {
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
 
  knex.distinct('userID')
    .from('t_orders')
    .where({amount: 0})
    .then((response)=>{
      res.json({
          message: 'fetched remaining_bill_patient_list',
          data: response
      });
    });
};

exports.get_bill_number = function (req, res) {
  console.log("get get_bill_number");
  knex.select('id', 'userID', 'serviceID', 'programID', 'testID', 'amount')
    .from('t_orders')
    .where({userID: req.params.user_id})
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


exports.getPaymentPendingPatient = function (req, res) {
  console.log("get remaining_bill_patient_list");

//   var query = knex.from('t_orders').join('t_tests', function() {
//    this.on('t_orders.testID', '=', 't_tests.id')
//    .on('t_tests.amount', '>', 't_orders.amount')
// }, 'left')

// var q = knex
//         .select(
//             'to.id',
//             'to.userID AS userID',
//             'to.amount AS paidAmount',
//             'tt.amount AS testAmount',
//             'tp.amount AS proAmount',
//             'ts.amount AS serAmount'
//         )
//         .from('t_orders AS to')
//         .leftJoin('t_tests AS tt', 'tt.id', 'to.testID')
//         .leftJoin('t_programs AS tp', 'tp.id', 'to.programID')
//         .leftJoin('t_services AS ts', 'ts.id', 'to.serviceID')
//         // .where('to.userID', '=', req.params.user_id)
//         .Where(function() {
//             this.where('to.amount', '>', 'tt.amount')
//           .andWhere('to.amount', '>', 'tp.amount')
//           .andWhere('to.amount', '>', 'ts.amount')
//           }
//         )
//         .andWhere(function() {
//             this.where('to.amount', '!=', 'tt.amount')
//           .andWhere('to.amount', '!=', 'tp.amount')
//           .andWhere('to.amount', '!=', 'ts.amount')
//           }
//         )
//         // .orWhere(
//           // function() {
//           //   this.where('to.amount', '!=', 'tp.amount')
//           //   // .andWhere('to.amount', '>', 'tp.amount')
//           // }
//         // )
//         // .orWhere(
//         //   function() {
//         //   this.where('to.amount', '!=', 'ts.amount')
//         //   // .andWhere('to.amount', '>', 'ts.amount')
//         // })
//         .then((response)=>{
//           var value = []
//           response.forEach((val,i)=>{
//               if(val.paidAmount != val.testAmount &&
//               val.paidAmount != val.proAmount &&
//               val.paidAmount != val.serAmount ){
//                 value.push(val);
//               }
//           });

//       res.json({
//           message: 'fetched remaining_bill_patient_list',
//           data: value
//       });
//     });

  var q = knex
        .select(
            'to.id',
            'to.userID AS userID',
            'to.amount AS paidAmount',
            'tt.amount AS testAmount',
            'tp.amount AS proAmount',
            'ts.amount AS serAmount'
        )
        .from('t_orders AS to')
        .leftJoin('t_tests AS tt', 'tt.id', 'to.testID')
        .leftJoin('t_programs AS tp', 'tp.id', 'to.programID')
        .leftJoin('t_services AS ts', 'ts.id', 'to.serviceID')
        .where('to.userID', '=', 'to.userID')
        .orWhere('to.amount', '>', 'tt.amount')
        .orWhere('to.amount', '>', 'tp.amount')
        .orWhere('to.amount', '>', 'ts.amount')
        .then((response)=>{
          var value = []
          response.forEach((val,i)=>{
              if(
                (val.paidAmount != val.testAmount &&
              val.paidAmount != val.proAmount &&
              val.paidAmount != val.serAmount) 
                &&
              (
                val.testAmount != null ||
                val.proAmount != null ||
                val.serAmount != null
              )
               ){
                value.push(val);
              }
          });

      res.json({
          message: 'fetched remaining_bill_patient_list',
          data: value
      });
    });


  // knex.distinct('userID')
  //   .from('t_orders')
  //   .where({amount: 0})
    // .then((response)=>{
    //   res.json({
    //       message: 'fetched remaining_bill_patient_list',
    //       data: response
    //   });
    // });
};
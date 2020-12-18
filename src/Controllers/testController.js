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

  exports.create_test = function (req, res) {
    // console.log(req);
      knex('t_orders').insert({userID: req.body.user_Id, testID: req.body.test_id})
        .then((response)=>{
          knex.select('id','userID','testID','pdf_blob')
          .from('t_orders')
          .where({id: response})
          .then((order)=>{
            res.json({
                message: 'New test fetched!',
                test: order[0]
            });
          })
          .catch((err) => {
              console.log(err);
          })

        })

  };

  exports.get_tests = function (req, res) {
    knex.select('id', 'name', 'amount', 'session')
      .from('t_tests')
      .then((response)=>{
        res.json({
            message: 'fetched tests',
            data: response
        });
      });
  };

  exports.get_paid_tests = function (req, res) {
    knex.select('id', 'userID', 'pdf_blob', 'testID')
      .from('t_orders')
      .whereNotNull("testID")
      .then((response)=>{
        res.json({
            message: 'fetched paid tests',
            data: response
        });
      });
  };

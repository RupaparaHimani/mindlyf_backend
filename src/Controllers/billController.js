const knexConfig = ('../../index');
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

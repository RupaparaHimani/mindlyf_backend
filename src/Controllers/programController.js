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

// Handle index actions
exports.getPrograms = function (req, res) {
  console.log("get program");
    knex.select()
      .from('t_programs')
      .withSchema()
      .then((response)=>{
        res.json({
            message: 'All programs fetched!',
            data: response
        });
      });
};

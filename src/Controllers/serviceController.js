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
exports.getServices = function (req, res) {
  console.log("get service");
    knex.select()
      .from('t_services')
    //   .where({email: 'arnab@omnicuris.com'})
      .withSchema()
      .then((response)=>{
        res.json({
            message: 'All services fetched!',
            data: response
        });
      });
};

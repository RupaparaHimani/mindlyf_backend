const knexConfig = ('../../index');

// const knex = require('knex')({
//     client: 'mysql',
//     connection: {
//       host: "localhost",
//       user: "root",
//       password: "KN<MS5JA~X0oaSqF",
//       database : 'mindlyfa_mindlyfappoinment'
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

  exports.create_appoinment = function (req, res) {
    // console.log(req);
      knex('t_appoinments').insert({patientID: req.body.patientID, doctorID: req.body.doctor_id, date: req.body.date, time: req.body.time})
        .then((response)=>{
          knex.select('id','patientID','doctorID','date', 'time')
          .from('t_appoinments')
          .where({id: response})
          .then((appoinment)=>{
            res.json({
                message: 'New appoinment fetched!',
                appoinment: appoinment[0]
            });
          })
          .catch((err) => {
              console.log(err);
          })

        })

  };

  exports.get_appoinments = function (req, res) {
    knex.select('id','patientID','doctorID','date', 'time')
      .from('t_appoinments')
      .then((response)=>{
        res.json({
            message: 'fetched appoinments',
            data: response
        });
      });
  };

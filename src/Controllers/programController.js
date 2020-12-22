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

exports.getOrderedPrograms = function (req, res) {
  console.log("get getOrderedPrograms");
  knex.select()
    .from('t_orders')
    .whereNotNull("programID")
    .then((response)=>{
      res.json({
          message: 'fetched paid programs',
          data: response
      });
    });
};



exports.create_program = function (req, res) {
  // console.log(req);
    knex('t_orders').insert({userID: req.body.user_id, programID: req.body.program_id, purpose: req.body.purpose})
      .then((response)=>{
        knex.select()
        .from('t_orders')
        .where({id: response})
        .then((program)=>{
          res.json({
              message: 'New program fetched!',
              program: program[0]
          });
        })
        .catch((err) => {
            console.log(err);
        })

      })

};

exports.get_program = function (req, res) {
  console.log("info", req.params.id);
  knex.select()
    .from('t_programs')
    .where({id: req.params.id})
    .then((response)=>{
      res.json({
          message: 'Fetched program',
          program: response[0]
      });
    })
};

exports.update_program = function (req, res) {
    knex.select()
      .from('t_orders')
      .where({id: req.body.id})
      .update({
        id: req.body.id,
        session_schedule: req.body.session_schedule,
      })
      .then((response)=>{
        knex.select()
        .from('t_orders')
        .where({id: req.body.id})
        .then((resp)=>{
            res.json({
                message: 'Get program',
                program: resp[0]
            });
        })
      }).catch((err) => {
          console.log(err);
      })
};

exports.delete_program = function (req, res) {
  console.log("delete");
  console.log(req.params);
  knex("t_orders")
  .del()
  .where({
    id: req.params.id
  }).then((response)=>{
    console.log(response);
    res.json({
        message: 'Delete Program',
        id: req.params.id
    });
  });
}

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


  exports.get_patient_count = function (req, res) {
      knex('t_user').count('id as patient_count')
      .where({user_type : 'patient'})
      .then((response)=>{
        res.json({
            message: 'fetched total_patient',
            data: response[0]
        });
      });
  };

  exports.get_online_patient_count = function (req, res) {
      knex('t_user').count('id as online_patient_count')
      .where({user_type : 'patient'})
      .andWhere({type: 'online'})
      .then((response)=>{
        res.json({
            message: 'fetched get_online_patient_count',
            data: response[0]
        });
      });
  };

  exports.get_offline_patient_count = function (req, res) {
      knex('t_user').count('id as offline_patient_count')
      .where({user_type : 'patient'})
      .andWhere({type: 'offline'})
      .then((response)=>{
        res.json({
            message: 'fetched get_offline_patient_count',
            data: response[0]
        });
      });
  };

  exports.get_most_booked_program_count = function (req, res) {
    knex.select('programID').count('programID as booked_program_count')
    .from('t_orders')
    .whereNotNull('programID')
    .groupByRaw("programID")
    .then((response)=>{
      response.sort(function (a, b) {
          return b.booked_program_count - a.booked_program_count
      })
      res.json({
          message: 'fetched get_most_booked_program_count',
          data: response[0]
      });
    });
  };

  exports.get_most_booked_test_count = function (req, res) {
    knex.select('testID').count('testID as booked_test_count')
    .from('t_orders')
    .whereNotNull('testID')
    .groupByRaw("testID")
    .then((response)=>{
      response.sort(function (a, b) {
          return b.booked_test_count - a.booked_test_count
      })
      res.json({
          message: 'fetched get_most_booked_test_count',
          data: response[0]
      });
    });
  };

  exports.get_most_booked_service_count = function (req, res) {
    knex.select('serviceID').count('serviceID as booked_service_count')
    .from('t_orders')
    .whereNotNull('serviceID')
    .groupByRaw("serviceID")
    .then((response)=>{
      response.sort(function (a, b) {
          return b.booked_service_count - a.booked_service_count
      })
      res.json({
          message: 'fetched get_most_booked_service_count',
          data: response[0]
      });
    });
  };


  exports.get_doctor_appoinment_count = function (req, res) {
      knex('t_appoinments').count('id as appoiment_count')
      .where({doctorID : req.query.doctor_id})
      .then((response)=>{
        res.json({
            message: 'fetched total_patient',
            data: response[0]
        });
      });
  };


// Wesite
exports.my_services = function (req, res) {
  knex.count('serviceID as my_services')
  .from('t_orders')
  .where({userID: req.query.user_id})
  .whereNotNull('serviceID')
  .then((response)=>{
    res.json({
        message: 'my_services',
        data: response[0]
    });
  });
};
exports.my_programs = function (req, res) {
  knex.count('programID as my_programs')
  .from('t_orders')
  .where({userID: req.query.user_id})
  .whereNotNull('programID')
  .then((response)=>{
    res.json({
        message: 'my_programs',
        data: response[0]
    });
  });
};
exports.my_tests = function (req, res) {
  knex.count('testID as my_tests')
  .from('t_orders')
  .where({userID: req.query.user_id})
  .whereNotNull('testID')
  .then((response)=>{
    res.json({
        message: 'my_tests',
        data: response[0]
    });
  });
};

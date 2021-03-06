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



  exports.create_appoinment = function (req, res) {
    // console.log(req);
      knex('t_appoinments').insert({patientID: req.body.patient_id, doctorID: req.body.doctor_id, date: req.body.date, time: req.body.time, interval_time: req.body.interval_time})
        .then((response)=>{


        	 knex('t_appoinments_drtime').
        	 insert({patientID: req.body.patient_id, doctorID: req.body.doctor_id, date: req.body.date, time: req.body.time, interval_time: req.body.interval_time}).then((response1)=>{
        	 	console.log(response1)
        	 })

          knex.select('id','patientID','doctorID','date', 'time', 'interval_time')
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
  	if(req.body.appId == ''){
       knex.select('id','patientID','doctorID','date', 'time', 'interval_time')
      .from('t_appoinments')
      .then((response)=>{
        res.json({
            message: 'fetched appoinments',
            data: response
        });
      });
    }
   else{
    knex.select('id','patientID','doctorID','date', 'time', 'interval_time')
      .from('t_appoinments')
      .where({doctorID : req.body.appId})
      .then((response)=>{
        res.json({
            message: 'fetched appoinments',
            data: response
        });
      });
   }

  };

  exports.get_appoinment = function (req, res) {
    console.log("info", req.params.id);
    knex.select('id','patientID','doctorID','date', 'time', 'interval_time')
      .from('t_appoinments')
      .where({id: req.params.id})
      .then((response)=>{
        res.json({
            message: 'Fetched appoinment',
            appoinment: response[0]
        });
      })
  };


  exports.update_appoinment = function (req, res) {
      knex.select('id','patientID','doctorID','date', 'time')
        .from('t_appoinments')
        .where({id: req.body.id})
        .update({
          id: req.body.id,
          patientID: req.body.patient_id,
          doctorID: req.body.doctor_id,
          date: req.body.date,
          time: req.body.time,
          interval_time: req.body.interval_time
        })
        .then((response)=>{

        	knex('t_appoinments_drtime').
        	 insert({patientID: req.body.patient_id, doctorID: req.body.doctor_id, date: req.body.date, time: req.body.time, interval_time: req.body.interval_time}).then((response1)=>{
        	 	console.log(response1)
        	 })
          knex.select('id','patientID','doctorID','date', 'time')
          .from('t_appoinments')
          .where({id: req.body.id})
          .then((resp)=>{
              res.json({
                  message: 'Get appoinment',
                  appoinment: resp[0]
              });
          })
        }).catch((err) => {
            console.log(err);
        })
  };

  exports.delete_appoinment = function (req, res) {
    console.log("delete");
    console.log(req.params);
    knex("t_appoinments")
    .del()
    .where({
      id: req.params.id
    }).then((response)=>{
      console.log(response);
      res.json({
          message: 'Delete Appoinment',
          id: req.params.id
      });
    });
  }

  exports.get_appoinment_DrTime = function (req, res) {
  	  	console.log(req.params.doctorID,req.params.Date)

    knex.select('id','patientID', 'doctorID','date', 'time', 'interval_time')
      .from('t_appoinments_drtime')
      .where({doctorID: req.params.doctorID})
      .andWhere({date: req.params.Date})
      .then((response)=>{
        res.json({
            message: 'Fetched t_appoinments_drtime',
            appoinmentTime: response
        });
      })
  };

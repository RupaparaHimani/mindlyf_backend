Contact = require('../../Model/userModel');
const { sendMail } = require('../../Utils/email')

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

// Handle index actions
exports.list = function (req, res) {
    console.log(req.query);
    knex.select('id','number','email','first_name', 'last_name', 'type')
      .from('t_user')
      .where({user_type: req.query.type})
      .then((response)=>{
        res.json({
            message: 'All users fetched!',
            users: response
        });
      });
};

exports.offline_list = function (req, res) {
    console.log(req.query);
    knex.select('id','number','email','first_name', 'last_name', 'type')
      .from('t_user')
      .where({user_type: 'patient'})
      .then((response)=>{
        res.json({
            message: 'All users fetched!',
            users: response
        });
      });
};


// Handle index actions
exports.get_pdf = function (req, res) {
    knex.select('pdf_blob')
      .from('t_user')
      .where({id: req.params.user_Id})
      .then((response)=>{
        res.json({
            message: 'All users fetched!',
            users: response[0]
        });
      });
};

exports.getOrder = function (req, res) {
  console.log("getorssderrr");
  knex.select('id','userID','order_time','amount','purpose', 'serviceID', 'programID')
    .from('t_orders')
    .where({userID: req.body.id})
    .then((response)=>{
      res.json({
          message: 'All orders fetched!',
          users: response
      });
    });
};


exports.getsearchresult = function (req, res) {
  console.log("getsearchresult", req);
  knex.select('id as service_id', 'title as service_title')
    .from('t_services')
    .where('title', 'like', '%'+req.params.searchparam+'%')
    .then((services_response)=>{
      knex.select('id as program_id', 'title as program_title')
        .from('t_programs')
        .where('title', 'like', '%'+req.params.searchparam+'%')
        .then((programs_response)=>{
          res.json({
              message: 'All orders fetched!',
              services: services_response,
              programs: programs_response
          });
        });
    });
};

exports.info = function (req, res) {
  console.log("info", req.params.userId);
  knex.select('id', 'first_name', 'last_name', 'email', 'number', 'schedule')
    .from('t_user')
    .where({id: req.params.userId})
    .then((response)=>{
      res.json({
          message: 'Fetched User',
          user: response[0]
      });
    })
};



exports.update_pdf = function(req, res){
  console.log("update_pdf", req.body);
  knex.select('id','testID', 'userID', 'pdf_blob')
    .from('t_orders')
    .where({id: req.body.order_id, userID: req.body.user_id})
    .update({
      pdf_blob: req.body.pdf_blob
    })
    .then((response)=>{
      console.log("res", response);
      knex.select('id','testID','userID','pdf_blob')
      .from('t_orders')
      .where({id: req.body.order_id})
      .then((data)=>{
        console.log(data, "daata");
          res.json({
              message: 'User Found!',
              test: data
          });
      }).catch((err) => {
        console.log(err);
      })
    }).catch((err) => {
        console.log(err);
    })
}

exports.change_password = function(req, res){
  console.log("change_password", req.body);
  knex.select('id')
    .from('t_user')
    .where({id: req.body.id})
    .update({
      password: req.body.password
    })
    .then((response)=>{
      res.json({
          message: 'Password successfully updated'
      });
    }).catch((err) => {
        console.log(err);
    })
}


exports.update = function (req, res) {
    let schedule;
    if(req.body.schedule != undefined){
      schedule = JSON.stringify( req.body.schedule);
    }else{
      schedule = ''
    }
    knex.select('id','number','email','first_name','last_name')
      .from('t_user')
      .where({id: req.body.id})
      .update({
        id: req.body.id,
        first_name: req.body.fname,
        last_name: req.body.lname,
        email: req.body.email,
        number: req.body.number,
        schedule: schedule
      })
      .then((response)=>{
        knex.select('id','number','email','first_name','last_name')
        .from('t_user')
        .where({id: req.body.id})
        .then((resp)=>{
            res.json({
                message: 'No user found',
                user: resp[0]
            });
        })
      }).catch((err) => {
          console.log(err);
      })
};

exports.order = function (req, res) {
  var text = '<html> <head> </head> <body> <div class="container"> <table width="100%" height="100%" bgcolor="#E4E6E9" cellspacing="0" cellpadding="0" border="0"> <tbody> <tr> <td width="100%" align="center" valign="top" bgcolor="#E4E6E9" style="background-color:#E4E6E9; min-height: 200px;"> <table> <tbody> <tr> <td class="table-td-wrap" align="center" width="458"> <table class="table-space" height="18" style="height: 18px; font-size: 0px; line-height: 0; width: 450px; background-color: #e4e6e9;" width="450" bgcolor="#E4E6E9" cellspacing="0" cellpadding="0" border="0"> <tbody> <tr> <td class="table-space-td" valign="middle" height="18" style="height: 18px; width: 450px; background-color: #e4e6e9;" width="450" bgcolor="#E4E6E9" align="left">&nbsp;</td> </tr> <tr> <td class="table-space-td" valign="middle" height="12" style="height: 12px; width: 450px; padding-left: 16px; padding-right: 16px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" align="center"></td> </tr> </tbody> </table> <table class="table-space" height="8" style="height: 8px; font-size: 0px; line-height: 0; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" cellspacing="0" cellpadding="0" border="0"> <tbody> <tr> <td class="table-space-td" valign="middle" height="8" style="height: 8px; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" align="left">&nbsp;</td> </tr> </tbody> </table> <table class="table-row" width="450" bgcolor="#FFFFFF" style="table-layout: fixed; background-color: #ffffff;" cellspacing="0" cellpadding="0" border="0"> <tbody> <tr> <td class="table-row-td" style="font-family: Arial, sans-serif; line-height: 19px; color: #444444; font-size: 13px; font-weight: normal; padding-left: 36px; padding-right: 36px;" valign="top" align="left"> <table class="table-col" align="left" width="378" cellspacing="0" cellpadding="0" border="0" style="table-layout: fixed;"> <tbody> <tr> <td class="table-col-td" width="378" style="font-family: Arial, sans-serif; line-height: 19px; color: #444444; font-size: 13px; font-weight: normal; width: 378px;" valign="top" align="left"> <table class="header-row" width="378" cellspacing="0" cellpadding="0" border="0" style="table-layout: fixed;"> <tbody> <tr> <img src="https://www.mindlyf.com/static/media/mind-lyf-04.8babbb2a.png" alt="" width="150" height="50"> </tr> <tr> <td class="table-space-td" valign="middle" height="12" style="height: 12px; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" align="left">&nbsp;</td> </tr> <tr> <td class="header-row-td" width="378" style="font-family: Arial, sans-serif; font-weight: normal; line-height: 19px; color: #478fca; margin: 0px; font-size: 18px; padding-bottom: 10px; padding-top: 15px;" valign="top" align="left">Thank you for booked session with us!</td> </tr> </tbody> </table> <div style="font-family: Arial, sans-serif; line-height: 20px; color: #444444; font-size: 13px;"> <b style="color: #777777;">Your session has been booked successfully! You can find the booking in Packages section of your Profile.!</b> </tr> </tbody> </table> </td> </tr> </tbody> </table> <table class="table-space" height="16" style="height: 16px; font-size: 0px; line-height: 0; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" cellspacing="0" cellpadding="0" border="0"> <tbody> <tr> <td class="table-space-td" valign="middle" height="16" style="height: 16px; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" align="left">&nbsp;</td> </tr> </tbody> </table> <table class="table-row" width="450" bgcolor="#FFFFFF" style="table-layout: fixed; background-color: #ffffff;" cellspacing="0" cellpadding="0" border="0"> <tbody> <tr> <td class="table-row-td" style="font-family: Arial, sans-serif; line-height: 19px; color: #444444; font-size: 13px; font-weight: normal; padding-left: 36px; padding-right: 36px;" valign="top" align="left"> <table class="table-col" align="left" width="378" cellspacing="0" cellpadding="0" border="0" style="table-layout: fixed;"> <tbody> <tr> <td class="table-col-td" width="378" style="font-family: Arial, sans-serif; line-height: 19px; color: #444444; font-size: 13px; font-weight: normal; width: 378px;" valign="top" align="left"> <div style="font-family: Arial, sans-serif; line-height: 19px; color: #444444; font-size: 13px; text-align: center;"> </div> <table class="table-space" height="16" style="height: 16px; font-size: 0px; line-height: 0; width: 378px; background-color: #ffffff;" width="378" bgcolor="#FFFFFF" cellspacing="0" cellpadding="0" border="0"> <tbody> <tr> <td class="table-space-td" valign="middle" height="16" style="height: 16px; width: 378px; background-color: #ffffff;" width="378" bgcolor="#FFFFFF" align="left">&nbsp;</td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <table class="table-space" height="6" style="height: 6px; font-size: 0px; line-height: 0; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" cellspacing="0" cellpadding="0" border="0"> <tbody> <tr> <td class="table-space-td" valign="middle" height="6" style="height: 6px; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" align="left">&nbsp;</td> </tr> </tbody> </table> <table class="table-row-fixed" width="450" bgcolor="#FFFFFF" style="table-layout: fixed; background-color: #ffffff;" cellspacing="0" cellpadding="0" border="0"> <tbody> <tr> <td class="table-row-fixed-td" style="font-family: Arial, sans-serif; line-height: 19px; color: #444444; font-size: 13px; font-weight: normal; padding-left: 1px; padding-right: 1px;" valign="top" align="left"> <table class="table-col" align="left" width="448" cellspacing="0" cellpadding="0" border="0" style="table-layout: fixed;"> <tbody> <tr> <td class="table-col-td" width="448" style="font-family: Arial, sans-serif; line-height: 19px; color: #444444; font-size: 13px; font-weight: normal;" valign="top" align="left"> <table width="100%" cellspacing="0" cellpadding="0" border="0" style="table-layout: fixed;"> <tbody> <tr> <td width="100%" align="center" bgcolor="#f5f5f5" style="font-family: Arial, sans-serif; line-height: 24px; color: #bbbbbb; font-size: 13px; font-weight: normal; text-align: center; padding: 9px; border-width: 1px 0px 0px; border-style: solid; border-color: #e3e3e3; background-color: #f5f5f5;" valign="top"> <a href="https://www.mindlyf.com/" style="color: #428bca; text-decoration: none; background-color: transparent;">mindlyf.com &copy; 2020</a> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <table class="table-space" height="1" style="height: 1px; font-size: 0px; line-height: 0; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" cellspacing="0" cellpadding="0" border="0"> <tbody> <tr> <td class="table-space-td" valign="middle" height="1" style="height: 1px; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" align="left">&nbsp;</td> </tr> </tbody> </table> <table class="table-space" height="36" style="height: 36px; font-size: 0px; line-height: 0; width: 450px; background-color: #e4e6e9;" width="450" bgcolor="#E4E6E9" cellspacing="0" cellpadding="0" border="0"> <tbody> <tr> <td class="table-space-td" valign="middle" height="36" style="height: 36px; width: 450px; background-color: #e4e6e9;" width="450" bgcolor="#E4E6E9" align="left">&nbsp;</td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </div> </body> </html>'
  if(req.body.service_id != undefined){
    knex('t_orders').insert({userID: req.body.userID, amount: req.body.amount, orderID: req.body.orderID, purpose: req.body.purpose, serviceID: req.body.service_id })
      .then((response)=>{
        sendMail(req.body.email,"Session booked","Your session has been booked successfully! You can find the booking in Packages section of your Profile.!",text)
            .then(() => {
              res.json({
                message: 'Email send',
              });
            }).catch ((err) => {
          return res.status(500).json({
            message: "Error while sending mail",
            error: err.message
          });
        });
        res.json({
            message: 'Record inserted',
            order: response[0]
        });
      }).catch((err) => {
          console.log(err);
      })
    }else if (req.body.program_id != undefined){
      console.log("else");
      knex('t_orders').insert({userID: req.body.userID, amount: req.body.amount, orderID: req.body.orderID, purpose: req.body.purpose , programID: req.body.program_id })
        .then((response)=>{
          sendMail(req.body.email,"Session booked","Your session has been booked successfully! You can find the booking in Packages section of your Profile.!", text)
            .then(() => {
              res.json({
                message: 'Email send',
              });
            }).catch ((err) => {
          return res.status(500).json({
            message: "Error while sending mail",
            error: err.message
          });
        });
          res.json({
              message: 'Record inserted',
              order: response[0]
          });
        }).catch((err) => {
            console.log(err);
        })
    }else if (req.body.test_id != undefined){
      console.log("else");
      knex('t_orders').insert({userID: req.body.userID, amount: req.body.amount, orderID: req.body.orderID, purpose: req.body.purpose , testID: req.body.test_id })
        .then((response)=>{
          sendMail(req.body.email,"Test booked","Your test has been booked!", text)
            .then(() => {
              res.json({
                message: 'Email send',
              });
            }).catch ((err) => {
          return res.status(500).json({
            message: "Error while sending mail",
            error: err.message
          });
        });
          res.json({
              message: 'Record inserted',
              order: response[0]
          });
        }).catch((err) => {
            console.log(err);
        })
    }
    else{
      knex('t_orders').insert({userID: req.body.userID, amount: req.body.amount, orderID: req.body.orderID, purpose: req.body.purpose })
        .then((response)=>{
          sendMail(req.body.email,"Session booked",'',text)
            .then(() => {
              res.json({
                message: 'Email send',
              });
            }).catch ((err) => {
          return res.status(500).json({
            message: "Error while sending mail",
            error: err.message
          });
        });
          res.json({
              message: 'Record inserted',
              order: response[0]
          });
        }).catch((err) => {
            console.log(err);
        })
    }
};

exports.getCounsellors = function(req, res){
  console.log("getCounsellors");
  knex.select('id','number','email','first_name','last_name')
    .from('t_user')
    .where({counsellor: 1})
    .then((response)=>{
      res.json({
          message: 'All counsellors fetched!',
          data: response
      })
    })
    .catch((err) => {
        console.log(err);
    })
}


exports.verifyMail = function (req, res) {
    knex.select('id','number','email','first_name','last_name')
      .from('t_user')
      .where({id: req.params.id})
      .then((response)=>{
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(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);
        const msg = {
        to: response[0].email,
        from: 'test@example.com',
        subject: 'Sending with Twilio SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
        };
        sgMail.send(msg);
      }).catch((err) => {
          console.log(err);
      })
};


exports.deleteUser = function (req, res) {
  console.log("delete");
  console.log(req.params);
  knex("t_user")
  .del()
  .where({
    id: req.params.id
  }).then((response)=>{
    console.log(response);
    res.json({
        message: 'Delete User',
        id: req.params.id
    });
  });
}

Contact = require('../Model/userModel');
const { sendMail } = require('../Utils/email')

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


exports.auth = function (req, res) {
    knex.select('id','number','email','first_name','last_name')
      .from('t_user')
      .where({email: req.body.email})
      .andWhere({password: req.body.password})
      .then((response)=>{
          if (response.length===0) {
            res.json({
                message: 'No user found',
            });
          }
          else {
            res.json({
                message: 'User fetched!',
                user: response[0]
            });
          }
      }).catch((err) => {
          console.log(err);
      })
};

exports.sign = function (req, res) {
  console.log("--------");
    knex('t_user').where({email: req.body.email}).then((response) => {
        console.log(response)
        if(response.length){
          console.log("if");
        knex.select('id','number','email','first_name','last_name')
        .from('t_user')
        .where({email: req.body.email})
        .then((userData)=>{
            res.json({
                message: 'User Found!',
                user: userData[0]
            });
        }).catch((err) => {
          console.log(err);
        })
        } else {
          console.log("else");
          if(req.body.counsellor != 1){
            req.body.counsellor = 0;
          }
            knex('t_user').insert({number: req.body.number, email: req.body.email, first_name: req.body.fname, last_name: req.body.lname, password: req.body.password, comment: req.body.comment, counsellor: req.body.counsellor})
            .then((response)=>{
                knex.select('id','number','email','first_name','last_name')
                .from('t_user')
                .where({id: response})
                .then((userData)=>{
                  var text = "";
                  if(req.body.counsellor == 1 ){
                    text = '<html> <head> </head> <body> <div class="container"> <table width="100%" height="100%" bgcolor="#E4E6E9" cellspacing="0" cellpadding="0" border="0"> <tbody> <tr> <td width="100%" align="center" valign="top" bgcolor="#E4E6E9" style="background-color:#E4E6E9; min-height: 200px;"> <table> <tbody> <tr> <td class="table-td-wrap" align="center" width="458"> <table class="table-space" height="18" style="height: 18px; font-size: 0px; line-height: 0; width: 450px; background-color: #e4e6e9;" width="450" bgcolor="#E4E6E9" cellspacing="0" cellpadding="0" border="0"> <tbody> <tr> <td class="table-space-td" valign="middle" height="18" style="height: 18px; width: 450px; background-color: #e4e6e9;" width="450" bgcolor="#E4E6E9" align="left">&nbsp;</td> </tr> <tr> <td class="table-space-td" valign="middle" height="12" style="height: 12px; width: 450px; padding-left: 16px; padding-right: 16px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" align="center"></td> </tr> </tbody> </table> <table class="table-space" height="8" style="height: 8px; font-size: 0px; line-height: 0; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" cellspacing="0" cellpadding="0" border="0"> <tbody> <tr> <td class="table-space-td" valign="middle" height="8" style="height: 8px; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" align="left">&nbsp;</td> </tr> </tbody> </table> <table class="table-row" width="450" bgcolor="#FFFFFF" style="table-layout: fixed; background-color: #ffffff;" cellspacing="0" cellpadding="0" border="0"> <tbody> <tr> <td class="table-row-td" style="font-family: Arial, sans-serif; line-height: 19px; color: #444444; font-size: 13px; font-weight: normal; padding-left: 36px; padding-right: 36px;" valign="top" align="left"> <table class="table-col" align="left" width="378" cellspacing="0" cellpadding="0" border="0" style="table-layout: fixed;"> <tbody> <tr> <td class="table-col-td" width="378" style="font-family: Arial, sans-serif; line-height: 19px; color: #444444; font-size: 13px; font-weight: normal; width: 378px;" valign="top" align="left"> <table class="header-row" width="378" cellspacing="0" cellpadding="0" border="0" style="table-layout: fixed;"> <tbody> <tr> <img src="https://www.mindlyf.com/static/media/mind-lyf-04.8babbb2a.png" alt="" width="150" height="50"> </tr> <tr> <td class="table-space-td" valign="middle" height="12" style="height: 12px; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" align="left">&nbsp;</td> </tr> <tr> <td class="header-row-td" width="378" style="font-family: Arial, sans-serif; font-weight: normal; line-height: 19px; color: #478fca; margin: 0px; font-size: 18px; padding-bottom: 10px; padding-top: 15px;" valign="top" align="left">Thank you for registering with us as Counsellor!</td> </tr> </tbody> </table> <div style="font-family: Arial, sans-serif; line-height: 20px; color: #444444; font-size: 13px;"> <b style="color: #777777;">We are excited to have you join us in our community</b> </div>  </tr> </tbody> </table> </td> </tr> </tbody> </table> <table class="table-space" height="12" style="height: 12px; font-size: 0px; line-height: 0; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" cellspacing="0" cellpadding="0" border="0"> <tbody> <tr> <td class="table-space-td" valign="middle" height="12" style="height: 12px; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" align="left">&nbsp;sss</td> </tr> </tbody> </table> <table class="table-space" height="12" style="height: 12px; font-size: 0px; line-height: 0; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" cellspacing="0" cellpadding="0" border="0"> <tbody> <tr> <td class="table-space-td" valign="middle" height="12" style="height: 12px; width: 450px; padding-left: 16px; padding-right: 16px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" align="center">&nbsp; <table bgcolor="#E8E8E8" height="0" width="100%" cellspacing="0" cellpadding="0" border="0"> <tbody> <tr> <td bgcolor="#E8E8E8" height="1" width="100%" style="height: 1px; font-size:0;" valign="top" align="left">&nbsp;</td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <table class="table-space" height="16" style="height: 16px; font-size: 0px; line-height: 0; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" cellspacing="0" cellpadding="0" border="0"> <tbody> <tr> <td class="table-space-td" valign="middle" height="16" style="height: 16px; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" align="left">&nbsp;</td> </tr> </tbody> </table> <table class="table-row" width="450" bgcolor="#FFFFFF" style="table-layout: fixed; background-color: #ffffff;" cellspacing="0" cellpadding="0" border="0"> <tbody> <tr> <td class="table-row-td" style="font-family: Arial, sans-serif; line-height: 19px; color: #444444; font-size: 13px; font-weight: normal; padding-left: 36px; padding-right: 36px;" valign="top" align="left"> <table class="table-col" align="left" width="378" cellspacing="0" cellpadding="0" border="0" style="table-layout: fixed;"> <tbody> <tr> <td class="table-col-td" width="378" style="font-family: Arial, sans-serif; line-height: 19px; color: #444444; font-size: 13px; font-weight: normal; width: 378px;" valign="top" align="left"> <div style="font-family: Arial, sans-serif; line-height: 19px; color: #444444; font-size: 13px; text-align: center;"> </div> <table class="table-space" height="16" style="height: 16px; font-size: 0px; line-height: 0; width: 378px; background-color: #ffffff;" width="378" bgcolor="#FFFFFF" cellspacing="0" cellpadding="0" border="0"> <tbody> <tr> <td class="table-space-td" valign="middle" height="16" style="height: 16px; width: 378px; background-color: #ffffff;" width="378" bgcolor="#FFFFFF" align="left">&nbsp;</td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <table class="table-space" height="6" style="height: 6px; font-size: 0px; line-height: 0; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" cellspacing="0" cellpadding="0" border="0"> <tbody> <tr> <td class="table-space-td" valign="middle" height="6" style="height: 6px; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" align="left">&nbsp;</td> </tr> </tbody> </table> <table class="table-row-fixed" width="450" bgcolor="#FFFFFF" style="table-layout: fixed; background-color: #ffffff;" cellspacing="0" cellpadding="0" border="0"> <tbody> <tr> <td class="table-row-fixed-td" style="font-family: Arial, sans-serif; line-height: 19px; color: #444444; font-size: 13px; font-weight: normal; padding-left: 1px; padding-right: 1px;" valign="top" align="left"> <table class="table-col" align="left" width="448" cellspacing="0" cellpadding="0" border="0" style="table-layout: fixed;"> <tbody> <tr> <td class="table-col-td" width="448" style="font-family: Arial, sans-serif; line-height: 19px; color: #444444; font-size: 13px; font-weight: normal;" valign="top" align="left"> <table width="100%" cellspacing="0" cellpadding="0" border="0" style="table-layout: fixed;"> <tbody> <tr> <td width="100%" align="center" bgcolor="#f5f5f5" style="font-family: Arial, sans-serif; line-height: 24px; color: #bbbbbb; font-size: 13px; font-weight: normal; text-align: center; padding: 9px; border-width: 1px 0px 0px; border-style: solid; border-color: #e3e3e3; background-color: #f5f5f5;" valign="top"> <a href="https://www.mindlyf.com/" style="color: #428bca; text-decoration: none; background-color: transparent;">mindlyf.com &copy; 2020</a> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <table class="table-space" height="1" style="height: 1px; font-size: 0px; line-height: 0; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" cellspacing="0" cellpadding="0" border="0"> <tbody> <tr> <td class="table-space-td" valign="middle" height="1" style="height: 1px; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" align="left">&nbsp;</td> </tr> </tbody> </table> <table class="table-space" height="36" style="height: 36px; font-size: 0px; line-height: 0; width: 450px; background-color: #e4e6e9;" width="450" bgcolor="#E4E6E9" cellspacing="0" cellpadding="0" border="0"> <tbody> <tr> <td class="table-space-td" valign="middle" height="36" style="height: 36px; width: 450px; background-color: #e4e6e9;" width="450" bgcolor="#E4E6E9" align="left">&nbsp;</td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </div> </body> </html>'
                  }else{
                    text='<html> <head> </head> <body> <div class="container"> <table width="100%" height="100%" bgcolor="#E4E6E9" cellspacing="0" cellpadding="0" border="0"> <tbody> <tr> <td width="100%" align="center" valign="top" bgcolor="#E4E6E9" style="background-color:#E4E6E9; min-height: 200px;"> <table> <tbody> <tr> <td class="table-td-wrap" align="center" width="458"> <table class="table-space" height="18" style="height: 18px; font-size: 0px; line-height: 0; width: 450px; background-color: #e4e6e9;" width="450" bgcolor="#E4E6E9" cellspacing="0" cellpadding="0" border="0"> <tbody> <tr> <td class="table-space-td" valign="middle" height="18" style="height: 18px; width: 450px; background-color: #e4e6e9;" width="450" bgcolor="#E4E6E9" align="left">&nbsp;</td> </tr> <tr> <td class="table-space-td" valign="middle" height="12" style="height: 12px; width: 450px; padding-left: 16px; padding-right: 16px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" align="center"></td> </tr> </tbody> </table> <table class="table-space" height="8" style="height: 8px; font-size: 0px; line-height: 0; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" cellspacing="0" cellpadding="0" border="0"> <tbody> <tr> <td class="table-space-td" valign="middle" height="8" style="height: 8px; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" align="left">&nbsp;</td> </tr> </tbody> </table> <table class="table-row" width="450" bgcolor="#FFFFFF" style="table-layout: fixed; background-color: #ffffff;" cellspacing="0" cellpadding="0" border="0"> <tbody> <tr> <td class="table-row-td" style="font-family: Arial, sans-serif; line-height: 19px; color: #444444; font-size: 13px; font-weight: normal; padding-left: 36px; padding-right: 36px;" valign="top" align="left"> <table class="table-col" align="left" width="378" cellspacing="0" cellpadding="0" border="0" style="table-layout: fixed;"> <tbody> <tr> <td class="table-col-td" width="378" style="font-family: Arial, sans-serif; line-height: 19px; color: #444444; font-size: 13px; font-weight: normal; width: 378px;" valign="top" align="left"> <table class="header-row" width="378" cellspacing="0" cellpadding="0" border="0" style="table-layout: fixed;"> <tbody> <tr> <img src="https://www.mindlyf.com/static/media/mind-lyf-04.8babbb2a.png" alt="" width="150" height="50"> </tr> <tr> <td class="table-space-td" valign="middle" height="12" style="height: 12px; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" align="left">&nbsp;</td> </tr> <tr> <td class="header-row-td" width="378" style="font-family: Arial, sans-serif; font-weight: normal; line-height: 19px; color: #478fca; margin: 0px; font-size: 18px; padding-bottom: 10px; padding-top: 15px;" valign="top" align="left">Thank you for registering with us!</td> </tr> </tbody> </table> <div style="font-family: Arial, sans-serif; line-height: 20px; color: #444444; font-size: 13px;"> <b style="color: #777777;">We are excited to have you join us in our community</b> </div> <div style="font-family: Arial, sans-serif; line-height: 15px; color: #444444; font-size: 12px;"> <p  style="color: #777777;" >Your EmailID is <b >'+req.body.email+'</b> and Password is <b>'+req.body.password+'</b></p> </div> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <table class="table-space" height="12" style="height: 12px; font-size: 0px; line-height: 0; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" cellspacing="0" cellpadding="0" border="0"> <tbody> <tr> <td class="table-space-td" valign="middle" height="12" style="height: 12px; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" align="left">&nbsp;sss</td> </tr> </tbody> </table> <table class="table-space" height="12" style="height: 12px; font-size: 0px; line-height: 0; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" cellspacing="0" cellpadding="0" border="0"> <tbody> <tr> <td class="table-space-td" valign="middle" height="12" style="height: 12px; width: 450px; padding-left: 16px; padding-right: 16px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" align="center">&nbsp; <table bgcolor="#E8E8E8" height="0" width="100%" cellspacing="0" cellpadding="0" border="0"> <tbody> <tr> <td bgcolor="#E8E8E8" height="1" width="100%" style="height: 1px; font-size:0;" valign="top" align="left">&nbsp;</td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <table class="table-space" height="16" style="height: 16px; font-size: 0px; line-height: 0; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" cellspacing="0" cellpadding="0" border="0"> <tbody> <tr> <td class="table-space-td" valign="middle" height="16" style="height: 16px; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" align="left">&nbsp;</td> </tr> </tbody> </table> <table class="table-row" width="450" bgcolor="#FFFFFF" style="table-layout: fixed; background-color: #ffffff;" cellspacing="0" cellpadding="0" border="0"> <tbody> <tr> <td class="table-row-td" style="font-family: Arial, sans-serif; line-height: 19px; color: #444444; font-size: 13px; font-weight: normal; padding-left: 36px; padding-right: 36px;" valign="top" align="left"> <table class="table-col" align="left" width="378" cellspacing="0" cellpadding="0" border="0" style="table-layout: fixed;"> <tbody> <tr> <td class="table-col-td" width="378" style="font-family: Arial, sans-serif; line-height: 19px; color: #444444; font-size: 13px; font-weight: normal; width: 378px;" valign="top" align="left"> <div style="font-family: Arial, sans-serif; line-height: 19px; color: #444444; font-size: 13px; text-align: center;"> </div> <table class="table-space" height="16" style="height: 16px; font-size: 0px; line-height: 0; width: 378px; background-color: #ffffff;" width="378" bgcolor="#FFFFFF" cellspacing="0" cellpadding="0" border="0"> <tbody> <tr> <td class="table-space-td" valign="middle" height="16" style="height: 16px; width: 378px; background-color: #ffffff;" width="378" bgcolor="#FFFFFF" align="left">&nbsp;</td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <table class="table-space" height="6" style="height: 6px; font-size: 0px; line-height: 0; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" cellspacing="0" cellpadding="0" border="0"> <tbody> <tr> <td class="table-space-td" valign="middle" height="6" style="height: 6px; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" align="left">&nbsp;</td> </tr> </tbody> </table> <table class="table-row-fixed" width="450" bgcolor="#FFFFFF" style="table-layout: fixed; background-color: #ffffff;" cellspacing="0" cellpadding="0" border="0"> <tbody> <tr> <td class="table-row-fixed-td" style="font-family: Arial, sans-serif; line-height: 19px; color: #444444; font-size: 13px; font-weight: normal; padding-left: 1px; padding-right: 1px;" valign="top" align="left"> <table class="table-col" align="left" width="448" cellspacing="0" cellpadding="0" border="0" style="table-layout: fixed;"> <tbody> <tr> <td class="table-col-td" width="448" style="font-family: Arial, sans-serif; line-height: 19px; color: #444444; font-size: 13px; font-weight: normal;" valign="top" align="left"> <table width="100%" cellspacing="0" cellpadding="0" border="0" style="table-layout: fixed;"> <tbody> <tr> <td width="100%" align="center" bgcolor="#f5f5f5" style="font-family: Arial, sans-serif; line-height: 24px; color: #bbbbbb; font-size: 13px; font-weight: normal; text-align: center; padding: 9px; border-width: 1px 0px 0px; border-style: solid; border-color: #e3e3e3; background-color: #f5f5f5;" valign="top"> <a href="https://www.mindlyf.com/" style="color: #428bca; text-decoration: none; background-color: transparent;">mindlyf.com &copy; 2020</a> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <table class="table-space" height="1" style="height: 1px; font-size: 0px; line-height: 0; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" cellspacing="0" cellpadding="0" border="0"> <tbody> <tr> <td class="table-space-td" valign="middle" height="1" style="height: 1px; width: 450px; background-color: #ffffff;" width="450" bgcolor="#FFFFFF" align="left">&nbsp;</td> </tr> </tbody> </table> <table class="table-space" height="36" style="height: 36px; font-size: 0px; line-height: 0; width: 450px; background-color: #e4e6e9;" width="450" bgcolor="#E4E6E9" cellspacing="0" cellpadding="0" border="0"> <tbody> <tr> <td class="table-space-td" valign="middle" height="36" style="height: 36px; width: 450px; background-color: #e4e6e9;" width="450" bgcolor="#E4E6E9" align="left">&nbsp;</td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </div> </body> </html>'
                  }
                    sendMail(userData[0].email,"Registration","Your Registration is complete!", text)
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
                        message: 'New user created!',
                        user: userData[0]
                    });
                }).catch((err) => {
                    console.log(err);
                })
            })
        }
        }).catch((err) => {
          console.log(err);
      })
};

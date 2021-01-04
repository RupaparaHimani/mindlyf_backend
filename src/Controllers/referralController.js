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

  exports.create_referral = function (req, res) {
    // console.log(req);
      knex('t_referrals').insert({referral: req.body.referral, from: req.body.from, refer_to_name: req.body.refer_to_name, refer_to_number: req.body.refer_to_number})
        .then((response)=>{
          knex.select()
          .from('t_referrals')
          .where({id: response})
          .then((referral)=>{
            res.json({
                message: 'New referral fetched!',
                referral: referral[0]
            });
          })
          .catch((err) => {
              console.log(err);
          })

        })

  };

  exports.get_referrals = function (req, res) {
    knex.select()
      .from('t_referrals')
      .then((response)=>{
        res.json({
            message: 'fetched referrals',
            data: response
        });
      });
  };


  exports.get_doctors_referrals = function (req, res) {
    var refer_to_name = ''
    if(req.query.refer_to_name.includes("+")){
      refer_to_name = req.query.refer_to_name.split('+').join(' ')
    }else{
        refer_to_name = req.query.refer_to_name
    }
    console.log(refer_to_name);
    knex.select()
      .from('t_referrals')
      .where({refer_to_name: refer_to_name})
      .andWhere({from: 'patient'})
      .then((response)=>{
        res.json({
            message: 'fetched referrals',
            data: response
        });
      });
  };


  exports.get_referral = function (req, res) {
    console.log("info", req.params.id);
    knex.select()
      .from('t_referrals')
      .where({id: req.params.id})
      .then((response)=>{
        res.json({
            message: 'Fetched referral',
            referral: response[0]
        });
      })
  };

  exports.update_referral = function (req, res) {
      knex.select()
        .from('t_referrals')
        .where({id: req.body.id})
        .update({
          id: req.body.id,
          referral: req.body.referral,
          from: req.body.from,
          refer_to_name: req.body.refer_to_name,
          refer_to_number: req.body.refer_to_number,
        })
        .then((response)=>{
          knex.select()
          .from('t_referrals')
          .where({id: req.body.id})
          .then((resp)=>{
              res.json({
                  message: 'Get referral',
                  referral: resp[0]
              });
          })
        }).catch((err) => {
            console.log(err);
        })
  };

  exports.delete_referral = function (req, res) {
    console.log("delete");
    console.log(req.params);
    knex("t_referrals")
    .del()
    .where({
      id: req.params.id
    }).then((response)=>{
      console.log(response);
      res.json({
          message: 'Delete Referral',
          id: req.params.id
      });
    });
  }

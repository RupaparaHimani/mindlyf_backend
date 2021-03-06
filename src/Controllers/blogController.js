const knexConfig = ('../../index');
const path = require("path");
const multer = require("multer");
const fs = require("fs");
var Buffer = require('buffer/').Buffer

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
   cb(null, __basedir + "/resources/static/assets/uploads/");
   },
   filename: (req, file, cb) => {
     cb(null, `${Date.now()}-bezkoder-${file.originalname}`);
   },
});

const upload = multer({
   storage: storage,
   limits:{fileSize: 1000000},
}).single("myImage");


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


  exports.create_blog = function (req, res) {
    // console.log(req);
    upload(req, res, (err) => {
      var valData = {};
      if(req.body.updateImage == 'true'){
        valData.title = req.body.title
        valData.description = req.body.description
        valData.image = fs.readFileSync(req.file.path)
      }
      else{
        valData.title = req.body.title
        valData.description = req.body.description
      }
      knex('t_blogs').insert(valData)
        .then((response)=>{
          res.json({
            message: 'Blog Created Done',
          });
        })
      if(!err)
         return res.sendStatus(200).end();
   })
  };

  exports.updateBlog = function (req, res) {

    console.log(req.body);
    // if(req.body.image != ''){
      upload(req, res, (err) => {
      var valData = {};
      if(req.body.updateImage == 'true'){
        valData.title = req.body.title
        valData.description = req.body.description
        valData.image = fs.readFileSync(req.file.path)
      }
      else{
        valData.title = req.body.title
        valData.description = req.body.description
      }
      console.log("valData",valData,req.body.title)
      knex.select('id', 'title', 'description', 'image')
        .from('t_blogs')
        .where({id: req.body.id})
        .update(valData)
        .then((response)=>{
            res.json({
          message: 'Blog Save Done',
      });
        })
      });
    // }
   //  else{
   //    upload(req, res, (err) => {
   //      knex.select('id', 'title', 'description', 'image')
   //        .from('t_blogs')
   //        .where({id: req.body.id})
   //        .update({
   //          title: req.body.title, description: req.body.description, image: fs.readFileSync(req.file.path)
   //        })
   //        .then((response)=>{
   //          console.log(response);
   //        })
   //      if(!err)
   //         return res.sendStatus(200).end();
   //   })
   // }
  };



  exports.get_blog = function (req, res) {
    console.log(req.params);
    knex.select('id', 'title', 'description', 'image')
      .from('t_blogs')
      .where({id: req.params.id})
      .then((response)=>{
        res.json({
            data: response[0]
        });
      });
  };

  exports.get_blogs = function (req, res) {
    knex.select('id', 'title', 'description', 'image')
      .from('t_blogs')
      .then((response)=>{
        res.json({
            message: 'fetched image',
            data: response
        });
      });
  };

  exports.deleteBlog = function (req, res) {
    console.log("delete");
    console.log(req.params);
    knex("t_blogs")
    .del()
    .where({
      id: req.params.id
    }).then((response)=>{
      res.json({
          message: 'Delete Blog',
      });
    });
  }

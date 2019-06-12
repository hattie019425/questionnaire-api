import * as express from 'express';
import { IRoute, Router } from 'express-serve-static-core';
let router: Router = express.Router();
import * as MongoClient from 'mongodb';
// var MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

/* GET home page. */
router.get('/', function (req, res, next) {

  MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("runoob");
    dbo.collection("site").find({}).toArray(function (err, result) { // 返回集合中所有数据
      if (err) throw err;
      res.send(result);
      db.close();
    });
  });
});


router.get('/add', function (req, res, next) {
  MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("runoob");
    var myobj = { name: "菜鸟教程", url: "www.runoob" };
    dbo.collection("site").insertOne(myobj, function (err, result) {
      if (err) throw err;
      console.log("文档插入成功");
      db.close();
      res.end();
    });
  });
});

export default router;
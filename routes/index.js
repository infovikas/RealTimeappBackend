var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var Data = require('../models/msg_data');



router.post('/', (req, res) => {
  const title = req.body.title;
  const content = req.body.content;

  // Sending message to Client and saving data to MongoDB
  var newMsg = new Data({ title: req.body.title, content: req.body.content, created: new Date() });
  newMsg.save(function (err) {
    if (err) throw err;
  });
});


// getting all messages sent
router.get('/data', function (req, res, err) {

  Data.find({}).then((result, err) => {
    // this.Data = result;
    res.send(result);
    console.log(result);

  }).catch((err) => {
    console.log(err);
  });
});


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

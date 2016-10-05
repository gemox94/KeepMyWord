'use strict';
const express   = require('express');
const models    = require('../models');
const bcrypt    = require('bcryptjs');
const passport  = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const router    = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/addView', (req, res) => {
  res.render('user/addWord');
});

router.post('/addWord', (req, res) => {

  models.Word.create({
    word: req.body.word
  }).then(() => {
    models.Meaning.create({
      meaning: req.body.meaning
    }).then(() => {
      console.log(req.user);
    });
  });

  //console.log(req.body);
});


module.exports = router;

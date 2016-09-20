const express   = require('express');
const models    = require('../models');
const bcrypt    = require('bcrypt');
const passport  = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const router    = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', (req, res) => {
  const saltRounds = 10;
  bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(req.body.password, salt, (err, hash) => {
        models.User.create({
          name: req.body.name,
          lastname: req.body.lastname,
          username: req.body.username,
          email: req.body.email,
          password: hash
        }).then(() => {
          res.redirect('/login');
        });
    });
  });
});

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  models.User.findById(id).then((user) => {
    done(null, user.dataValues);
  });
});

router.post('/login',
  passport.authenticate('local', {failureRedirect: '/login'}),
  function(req, res){
    res.redirect('/');
  }
);

passport.use(new LocalStrategy(
  (username, password, done) => {
      models.User.findOne({where: {username: username}}).then((userSeq) => {
        let user = userSeq.dataValues;
        if(!user){
          return done(null, false, {message: 'Unknown user '+ username});
        }

        bcrypt.compare(password, user.password, (err, isMatch) => {
          //if(err) console.log(err);
          if(isMatch){
            //console.log(user.username);
            return done(null, user);
          }else{
            console.log('Invalid password');
            return done(null, false, {message: 'Invalid password'});
          }
        });
      });
  }
));

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/login');
});

module.exports = router;

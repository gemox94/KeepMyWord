'use strict';
const bcrypt = require('bcrypt');

module.exports.hashPassword = (password, callback) => {

  const saltRounds = 10;
  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
        console.log(hash);
    });
  });

}

'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var User;

var userSchema = Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.statics.register = function(user, cb){
  var username = user.username;
  var password = user.password;

  bcrypt.genSalt(10, function(err, salt){
    bcrypt.hash(password, salt, function(err, hash){
      var user = new User();
      user.username = username;
      user.password = hash;
      user.save(function(err, savedUser){
        savedUser.password = null;
        cb(err, savedUser);
      });
    });
  });
};

User = mongoose.model('User', userSchema);

module.exports = User;

'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var User;

var userSchema = Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: String,
  avatar: String,
  // items:
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

userSchema.statics.authenticate = function(user, cb){
  User.findOne({username: user.username}, function(err, dbUser){
      console.log('here', !dbUser, err);
    if (err || !dbUser) return cb(err || 'Incorrect username or password');
    bcrypt.compare(user.password, dbUser.password, function(err, res){
      if (err || !res) return cb(err || 'Incorrect username or password');
      dbUser.password = null;
      cb(null, dbUser);
    });
  });
}

User = mongoose.model('User', userSchema);

module.exports = User;

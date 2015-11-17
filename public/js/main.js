'use strict';

$(document).ready(init);

function init(){

  $('#register').click(register);
  $('#login').click(login);
  $('#submitLogin').click(loadUserArea);
}

function loadUserArea(e){
  e.preventDefault();
  var user = {};
  user.username = $('#usernameLogin').val();
  user.password = $('#passwordLogin').val();

  $.post('/users/authenticate', user)
  .done(function(data){
    console.log(data);
    window.location.replace(`/cells/${data._id}`)
  }).fail(function(err){
    console.log(err);
  });


}

function login(){
  $('#loginArea').toggleClass('hide');
}

function register(){

  swal({
    title: "Enter The Dungeon!",
    text: 'Please select a new username',
    type: 'input',
    showCancelButton: true,
    closeOnConfirm: false,
    animation: "slide-from-top"
  }, function(newUsername){
    // console.log(`${input}`)
    if (!newUsername) return;
    $.get(`/users/check/${newUsername}`)
      .done(function(result){
        // console.log('here', newUsername);
        if (result !== 'ok'){
          console.log(result);
          register2();
          return;
        }
        swal({
          title: "Enter The Dungeon!",
          text: 'Great! Now choose a password',
          type: 'input',
          inputType: 'password',
          showCancelButton: true,
          closeOnConfirm: false,
          animation: "slide-from-bottom"
        }, function(password1){
          if (!password1) return;
          swal({
            title: "Enter The Dungeon!",
            text: 'Please confirm your password',
            type: 'input',
            inputType: 'password',
            showCancelButton: true,
            closeOnConfirm: true,
            animation: "pop"
          }, function(password2){
            console.log(newUsername, password1, password2);
            if (password1 === password2){
              var newUser = {};
              newUser.username = newUsername;
              newUser.password = password1;

              $.post('/users/register', newUser)
              .done(function(newUser){
                console.log('user saved');
              }).fail(function(err){
                console.log(err);
              });
            }

          });
        });



      }).fail(function(err){
        console.log(err);
        // display username taken message
    });
  });
}


function register2(){

  swal({
    title: "Enter The Dungeon!",
    text: 'Sorry! That username is already taken. Please select a new username',
    type: 'input',
    showCancelButton: true,
    closeOnConfirm: false,
    animation: "pop"
  }, function(newUsername){
    // console.log(`${input}`)
    if (!newUsername) return;
    $.get(`/users/check/${newUsername}`)
      .done(function(result){
        // console.log('here', newUsername);
        if (result !== 'ok'){
          console.log(result);
          register2();
          return;
        }
        swal({
          title: "Enter The Dungeon!",
          text: 'Great! Now choose a password',
          type: 'input',
          inputType: 'password',
          showCancelButton: true,
          closeOnConfirm: false,
          animation: "slide-from-bottom"
        }, function(password1){
          if (!password1) return;
          swal({
            title: "Enter The Dungeon!",
            text: 'Please confirm your password',
            type: 'input',
            inputType: 'password',
            showCancelButton: true,
            closeOnConfirm: true,
            animation: "pop"
          }, function(password2){
            console.log(newUsername, password1, password2);
            if (password1 === password2){
              var newUser = {};
              newUser.username = newUsername;
              newUser.password = password1;

              $.post('/users/register', newUser)
              .done(function(newUser){
                console.log('user saved');
              }).fail(function(err){
                console.log(err);
              });
            }

          });
        });



      }).fail(function(err){
        console.log(err);
        // display username taken message
    });
  });
}

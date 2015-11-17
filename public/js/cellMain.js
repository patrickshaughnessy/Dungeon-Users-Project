'use strict';

$(document).ready(init);

function init(){

  $('#logout').click(logout);
  // $('#avatarButton').click(changeAvatar);
};

// function changeAvatar(){
//   var $input = $('<input>').attr({
//     type: 'file',
//     id: 'input',
//     onchange: 'handleFiles(this.files)'
//   });
//   $('#profile').append($input);
// }

function handleFiles(file){
  console.log(file);
  $('#avatar').attr('src', file[0]);
}

function logout(){
  $.post('/users/logout')
  .done(function(res){
    window.location.replace('/');
  }).fail(function(err){
    console.log(err);
  });
}

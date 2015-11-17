'use strict';

$(document).ready(init);

function init(){

  $('#logout').click(logout);
};

function logout(){
  $.post('/users/logout')
  .done(function(res){
    window.location.replace('/');
  }).fail(function(err){
    console.log(err);
  });
}

import $ from 'jquery'
import { UserLogin, Valid, regexEmail }from './user'

const user = new UserLogin();
const valid= new Valid();

$(function(){
  user.email.on('change', function(){
    valid.Regex(this, this.value, regexEmail);
  });
  user.password.on('change', function(){
    valid.Length(this, this.value)
  });
  $('#login-form').on('submit', function(e){
    console.log(valid.Input.length);
    if(valid.Input.length < 2){
      e.preventDefault()
    }
  })

});
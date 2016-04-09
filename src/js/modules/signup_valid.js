import $ from 'jquery'
import { 
  UserSignup, 
  Valid, 
  regexEmail, 
  regexPassword 
}from './user'

const user = new UserSignup();
const valid= new Valid();

$(function(){
  user.name.on('change', function(){
    valid.Length(this, this.value)
  });
  user.email.on('change', function(){
    valid.Regex(this, this.value, regexEmail);
  });
  user.password.on('change', function(){
    valid.Regex(this, this.value, regexPassword);
  });
  $('#signup-form').on('submit', function(e){
    if(valid.Input.length < 3){
      e.preventDefault()
    }
  })
});
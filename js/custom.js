$(function(){
 
 $('.error_msg_fullName').hide();
  $('.error_msg_email').hide();
  $('.error_msg_phone').hide();
  $('.error_msg_message').hide();

  var error_fullName = false;
  var error_email = false;
  var error_phone = false;
  var error_message = false;

  $("#fullName").focusout(function(){
    check_fullName();
    
  });
  $("#email").focusout(function(){
    check_email();
    
  });
  $("#phone").focusout(function(){
    check_phone();
    
  });
  $("#message").focusout(function(){
    check_message();
   
  });

  $("#fullName").focus(function(){
   $('.error_msg_fullName').hide();
  });
  $("#email").focus(function(){
   $('.error_msg_email').hide();
  });
  $("#phone").focus(function(){
   $('.error_msg_phone').hide();
  });
  $("#message").focus(function(){
   $('.error_msg_message').hide();
  });

  $("#phone").keypress(function (e) {
//if the letter is not digit then display error and don't type anything
if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
   //display error message
   $(".error_msg_phone").html("Digits Only").show().fadeOut("slow");
          return false;
}
});

  function check_fullName(){
      var pattern = /^[a-zA-Z]*$/;
      var fullName = $("#fullName").val();
      if(pattern.test(fullName) && fullName !== ''){
      $('.error_msg_fullName').hide();
      } else{
       $('.error_msg_fullName').text("* Please enter only charaters"); 
       $('.error_msg_fullName').show();
       error_fullName = true
      }
  }

  function check_email(){
      var pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      var email = $("#email").val();
      if(pattern.test(email) && email !== ''){
      $('.error_msg_email').hide();
      } else{
       $('.error_msg_email').html("* Please enter valid email address."); 
       $('.error_msg_email').show();
       error_email = true
      }
  }
   
  function check_phone(){
      var pattern =/^[0-9]*$/;
      var phone = $("#phone").val();
      var phnLength = phone.length;
      if(  phone !== '' && phnLength >= 10){
       $('.error_msg_phone').hide();
      } else{
       $('.error_msg_phone').html("* Please enter valid Phone number."); 
       $('.error_msg_phone').show();
       error_phone = true
      }
  }

  function check_message(){
      //var pattern = /^[a-zA-Z]*$/;
      var message = $("#message").val();
      if(message !== ''){
      $('.error_msg_message').hide();
      } else{
       $('.error_msg_message').html("* Please enter your message."); 
       $('.error_msg_message').show();
       error_message = true
      }
  }

  $('#contact_form').submit(function(event){
      event.preventDefault();
   error_fullName = false;
   error_email = false;
   error_phone = false;
   error_message = false;

   check_fullName();
   check_email();
   check_phone();
   check_message();
   if(error_fullName === false && error_email === false && error_phone === false && error_message === false){
      
       emailjs.sendForm('service_gptuxkr', 'template_z6olzym','#contact_form')
           .then(function(response) {
           console.log('SUCCESS!', response.status, response.text);
           $(".success").html("Your details are successfully submitted with us.!").show().fadeOut(5000);
           }, function(error) {
           console.log('FAILED...', error);
           });
       $("#fullName").val('');
       $("#email").val('');
       $("#phone").val('');
       $("#message").val('');
       return true;
       
   }else{
       $('.error_msg').html("Please fill the required field.").show().fadeOut(3000);
       return false;
   }
  })


  // $(".navbar-nav > li").on('click', function(){

  //   $('.sub_menu_list_mob').slideToggle();
  // });

})
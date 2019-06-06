function retHomeClicked() {
  $("#username").val("")
  $("#password").val("")
  document.location.href = "/"
}

$(document).ready(function(){
  $("#returnButton").click(retHomeClicked);
  $("#login").submit(function() {
      $.ajax({
        url:"/login", //change to signup to ignitiate signup
        type:"POST",
        data:{username:$("#username").val(), password:$("#password").val()},
        success: function(data){
          console.log(data.redirect);
          if(!data.redirect) {
            $("#username").val("")
            $("#password").val("")
            $("#response").html("Incorrect Username or Password");
          } else {
            window.location = data.redirect;
          }
        },
        dataType: "json"
      })
      return false;
    })
});

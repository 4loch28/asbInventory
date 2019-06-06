//function success(data) { 
//  alert(data.name);
//}
var origName = "";
var origStock = -1;
var email = "";

function save() {
  console.log("details save")
      var firstTimeCheck = false;
    //check if stock is greater than 0. If true set boolean to true. After update, if boolean true and stock == 0 send email. Send in email and product name
      if (origStock > 0) {
        console.log("firstTimeCheck SET true")
        firstTimeCheck = true;
      }
      $.ajax({
      url:"/updateProduct",
      type:"PUT",
      data:{origName: origName,name: $("#name").val(), price: $("#price").val(), description: $("#description").val(), stock: $("#stock").val()},
      success: function(data){
        if (!data) {
          return false;
        }
        if (firstTimeCheck) {
          console.log("firstTimeCheck true")
          console.log($("#stock").val() + " " + typeof $("#stock").val())
          if (($("#stock").val()).valueOf() == ('0').valueOf()) {

           $.ajax({
            url: "/sendEmail",
            type: "POST",
            data: {name: data.name, email: email},
            success: function(data){
            } ,     
            dataType: "json"
            });  

          }
        }
        origStock = $("#stock").val();
        console.log(data);
        $("#view").prop("checked",true)
        view()
      },
      dataType: "json"
      })
    
}

function deleteClicked() {
    
  $.ajax({
    url:"/deleteProduct",
    type:"DELETE",
    data:{name: origName},
    success: function(data){
    },
    dataType: "json"
    })

  document.location.href = "/";
}

function view() {
  console.log("viewing")
  $("#name").attr("readonly", "readonly");
  $("#description").attr("readonly", "readonly");
  $("#price").attr("readonly", "readonly");
  $("#stock").attr("readonly", "readonly");
  $("#save").hide();
  $("#delete").hide();
}

function back() {
  document.location.href = "/";
}

$(document).on("input","#view", view)

$(document).on("input","#edit",function() {
  console.log("editing")
  $("#name").removeAttr("readonly");
  $("#description").removeAttr("readonly");
  $("#price").removeAttr("readonly");
  $("#stock").removeAttr("readonly");
  $("#save").show();
  $("#delete").show();
  //$("#save").click(save);
})

  function checkAuthSuccess(data) {
    if (data.auth) {
      email = data.email;
      console.log("This is an admin");
      $("#editToggle").show();
    } else {
      console.log("This is NOT an admin");
      $("#editToggle").hide();
    }
  }

$(document).ready(function(){ 
  
  $("#backButton").click(back);
  $("#save").click(save); 
  $("#save").hide();
  $("#delete").click(deleteClicked); 
  $("#delete").hide();

  $.ajax({
  url:"/tempProductData",
  type:"GET",
  data:{},
  success: function(data){
    console.log(data.name);
    $("#name").val(data.name)
    $("#price").val(data.price)
    $("#description").val(data.description);
    $("#stock").val(data.stock);
    origName = data.name;
    origStock = data.stock;
    let str = '<img id = "picture" src="/public/images/' + data.image +'" alt = "Test" height="300px" width="400px" class="center" style="margin-left:auto;margin-right:auto;display:block">'
    console.log(str)
    $("#inner").append(str);
  },
  dataType: "json"

  
})

  $.get("/checkAuth",checkAuthSuccess);
});    
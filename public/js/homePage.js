
          var tempName ="";
          var tempId = 0;
          var tableData = [];
      function success(data){
        //console.log("home page: " + data.objects[i].price)
        console.log(data)
        for (let i = 0; i < data.length; i++) {
          if (data[i] == undefined) { //NEW
            continue;
          }
          console.log(typeof data[i].name + " " + data[i].name)
          tempName = data[i].name
          tableData.push(data[i].name);
          console.log(tempId)
          $("#table").append("<tr align = 'center' id='"+tempId +"' ><td id='"+tempId +"' onclick={handler(id)}><a href='#' >" + tempName + "<td><img src='public/images/" + data[i].image + "' height='30' width='30'></td>" + "</a></td><td id = 'descRow'>" + data[i].description+ "</td><td>" + data[i].price + "</td><td>" + data[i].stock + "</td></tr>");
          //$("#table").append("<tr align = 'center' id='"+tempId +"' ><td id='"+tempId +"' onclick={handler(id)}><a href='#' >" + tempName + "<td><img src='public/images/" + data[i].image + "' height='30' width='30'></td>" + "</a></td><td id = 'descRow'>" + data[i].description+ "</td><td>" + data[i].price + "</td><td><input type='number' id='stockClicker' value='" + data[i].stock + "'></input></td></tr>");
          console.log(tempId)
          tempId++;
        }
      }

      //$("#stockClicker").change(function() {
        //alert( "Handler for .change() called." );
      //});

      function handler(e) {
        
        let index = 0;
        e = parseInt(e);
        e+=1;
        console.log("e is " + e);

        $("#table tr").each(function () {
        //$(this).find('tr').each (function() {
          console.log("index is " + index);
          if (index === parseInt(e)) {

            $.post("/setTempProductName",{productName:tableData[parseInt($(this).attr("id"))]},
                function() {document.location.href = "/details"});
          }
          index++;
        }); 
      //})

      }
      function logout() {
        console.log("logout");
        $.get("/logout",function(data){
          window.location = data.redirect;
        });
        return false;

       /* var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
          for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            c = c.substring(0,c.indexOf('='));
            document.cookie = c + "= ";
          }
          document.location.href = "/edit" */
      }

      function addProduct() {
        document.location.href = "/addProduct"
      }
      function aboutClicked() {
        document.location.href = "/about"
      }
      function loginClicked() {
        document.location.href = "/edit"
      }

      function checkAuthSuccess(data) {
        if (data.auth) {
          console.log("This is an admin");
          $("#editEmail").val(data.email);
          $("#logout").show();
          $("#addProduct").show();
          $("#editEmail").show();
          $("#emailLabel").show();
          $("#loginButton").hide();
            //$("body").append('<input type="button" value="Logout" id="logout"/>');   
        } else {
          console.log("This is NOT an admin");
          $("#logout").hide();
          $("#addProduct").hide();
          $("#editEmail").hide();
          $("#emailLabel").hide();
          $("#loginButton").show();
        }
      }

      $(document).ready(function(){
        $.get("/checkAuth",checkAuthSuccess);
        $.get("/getAllProducts",success); //and get last email used
        $("#logout").click(logout);
        $("#aboutButton").click(aboutClicked);
        $("#addProduct").click(addProduct);
        $("#loginButton").click(loginClicked);     
      })


    let $emailBox = $('#editEmail'),
    timeoutId;

    $emailBox.keyup(function () { 
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(function () {
            // Make ajax call to save data.
            $.ajax({
              url:"/updateEmail", //change to signup to ignitiate signup
              type:"POST",
              data:{email:$('#editEmail').val()},
              success: function(data){
              },
              dataType: "json"
            })
        }, 1000);
    });
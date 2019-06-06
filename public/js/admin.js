//function success(data) { 
     //  alert(data.name);
      //}
      
     
      function changeClicked(){
      //$.get("/request", {index:1},success);
      
      $.ajax({
        url:"/newProduct",
        type:"POST",
        data:{name:$("#name").val(), description:$("#descri").val(),price:$("#price").val(), stock:$("#stock").val(),image:$("#fileStuff").val()},
        success: function(data){
         if(!data)
            alert("An error occured adding this product")
          else
            if (confirm("Product created. Add another product?")) {
              $("#name").val(undefined)
              $("#descri").val(undefined)
              $("#price").val(undefined) 
              $("#stock").val(undefined)
              $("#fileStuff").val(undefined)
            } else {
              document.location.href = "/";
            }
        },
        dataType: "json"
      })
        return false;
      }

      function back() {
        document.location.href = "/";
      }

      function checkAuthSuccess(data) {
        if (data.auth) {
          console.log("This is an admin")   
        } else {
          console.log("This is NOT an admin");
          document.location.href = "/restrictedAccess"
        } 
      }

      $(document).ready(function(){ 
        $.get("/getAllProducts");
        $.get("/checkAuth",checkAuthSuccess);
        $("#backButton").click(back); 

        $("form").submit(
           function(event)
          {
            changeClicked();
          });
      });    

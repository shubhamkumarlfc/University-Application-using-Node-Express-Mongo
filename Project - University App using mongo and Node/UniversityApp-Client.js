var SERVER_URL = 'http://dev.cs.smu.ca:8100';
	
function save_university(){
		var name = $("#name").val();
		var address = $("#address").val();
		var phone = $("#phone").val();
		try{
			if(validateUserForm(name,address,phone)){
			//create an object
				var newObj = {
					"Name": name,
					"Address": address,
					"PhoneNumber": phone
				};
				
				//now send the request
			$.post(SERVER_URL + "/addUniversity",
					newObj,
				function (data) {	
					alert("Result saved successfully!");
				        $("#name").val("");
			                $("#address").val("");
               			        $("#phone").val("");

					}).fail(function (error) {
				alert("Error: " +error.responseText);
			});

		}
		}
		catch(e){
			alert("Some Error occured due to your Browser");
		}
}

/** Validate the User Form **/
function validateUserForm(name,address,phone) { 

	//check empty fields
	if (name == '') {
		alert("Please enter the name of the university!");
		$("#name").focus();
		return false;
	}
	if (address == '') {
		alert("Please enter the address of the university!");
		$("#address").focus();
		return false;
	}
	if (phone == '') {
		alert("Please enter the phone number of the university!");
		$("#phone").focus();
		return false;
	}
	if (phone == '') {
		alert("Please enter the phone number of the university!");
		$("#phone").focus();
		return false;
	}
	// address Validation for first character number
	var firstChar = address.trim().substr(0, 1);
	 if (isNaN(firstChar)) {
        alert("Address should start with a number!");
        $("#address").focus();
        return false;
    }
	
	// phone number validation for number and hyphens
	var tokens = phone.split('-');
	for (var i = 0; i < tokens.length; i++) {
		if (isNaN(tokens[i])) {
			alert("Please use only numbers or hyphens!");
			$("#phone").focus();
			return false;
		}//end if
	}//end for
	var pattern = /[a-z]/i;
	
	//address validation for alphabets
	if (!(pattern.test(address))) {
		alert("Address should contain letters!");
		$("#address").focus();
		return false;
	}
        
	// phone number validation for 10 digits
	var patt = /^\d{3}[-]*\d{3}[-]*\d{4}$/;
	if(!phone.match(patt)){
		alert("Phone number can only be in 999-999-9999 or 9999999999 format.");
		$("#phone").focus();		
		return false;
	}
	return true;
}


function search_universities(){
	try{
		var key = {"Name":$('#searchKey').val()};
		//now send the request
			$.post(SERVER_URL + "/searchUniversity",
					key,
					function (data) {
						if(key.Name.toLowerCase() == data[0].Name.toLowerCase()){
							alert("Record Found");
							$("#name").val(data[0].Name);
							$("#address").val(data[0].Address);
							$("#phone").val(data[0].PhoneNumber);
					}
					else {
						alert("No record found");
					}
					}).fail(function (error) {
				alert("Error: " +error.responseText);
			});
			
			
		}
		catch(e){
			
			alert("Some Error occured due to your Browser");
		}
}

function delete_university (){
	try{
	 if ($("#name").val() != null || $("#name").val() != "" ) {
		
		var key = {"Name":$('#name').val()}; 
		//now send the request
			$.post(SERVER_URL + "/deleteUniversity",
					key,
					function (data) {
					var obj = data;
					if(obj.n > 0){
						alert(obj.n+" Record has been deleted ");
					}
					else {
						alert(" No record found with the specified name.");
					}
					}).fail(function (error) {
				alert("Error: " +error.responseText);
			});	
		}
	else { 
		alert("Please enter the University Name ");
	}
	}	
	catch(e){
			alert("Some Error occured due to your Browser");
	}
}

function display_universities(){
	try{
		var dataTable=document.getElementById('data');
		dataTable.innerHTML = '';//empty
		$.post(SERVER_URL + "/displayUniversity",
			function (data) {
				if(data.length > 0){
					var universities = data;
					//Header row
					var row=dataTable.insertRow(0);
					var nameCell=row.insertCell(0);
					var addressCell=row.insertCell(1);
					var phoneCell=row.insertCell(2);

					nameCell.innerHTML='&nbsp;Name&nbsp; ';
					addressCell.innerHTML='&nbsp;Address&nbsp; ' ;
					phoneCell.innerHTML='&nbsp;Phone&nbsp;';

					//Insert data
					for(var i=0; i<universities.length; i++)
						{
							var row=dataTable.insertRow(-1);
							var nameCell=row.insertCell(0);
							var addressCell=row.insertCell(1);
							var phoneCell=row.insertCell(2);
							nameCell.innerHTML="&nbsp;"+universities[i].Name+"&nbsp; ";
							addressCell.innerHTML="&nbsp; "+universities[i].Address+"&nbsp; ";
							phoneCell.innerHTML="&nbsp; "+universities[i].PhoneNumber+"&nbsp; ";
						}
					$("#data").focus();
					}
					else {
						alert("No record found");
					}
					}).fail(function (error) {
				alert("Error: " +error.responseText);
			});			
		
		
	}
	catch(e){
			alert("Some Error occured due to your Browser");
	}
}

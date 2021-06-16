window.onload = function(){
	// Buttons variable created
	var quickAddBtn = document.getElementById('QuickAdd');
	var quickAddFormDiv = document.querySelector('.quickaddForm')
	var cancelBtn = document.getElementById('Cancel');
	var AddBtn = document.getElementById('Add');
	// Form Fields
	var fullname = document.getElementById('fullname');
	var phone = document.getElementById('phone');
	var email = document.getElementById('email');

	// Got the Divs
	var addBookDiv = document.querySelector('.addbook');

	quickAddBtn.addEventListener("click", function(){

		// to display the form div
		quickAddFormDiv.style.display = "block";
	});

	cancelBtn.addEventListener("click", function(){
		quickAddFormDiv.style.display = "none";
	});

	AddBtn.addEventListener("click", addToBook);

//use buddling functionality to VOID ADDING more event listeners to delete
	addBookDiv.addEventListener("click", removeEntry);

	// created a array to hold the JSON objects : Storage Array
	var addressBook = [];
//array details Storage

//adding form fields to json using constructor function.
	function jsonStructure(fullname,phone,address,city,email){
		this.fullname = fullname;
		this.phone = phone;
		this.email = email;
	}

//Adding the filteres which will block the adding if users have left any field.
	function addToBook(){
		var isNull = fullname.value!='' && phone.value!='' && email.value!='';
		if(isNull){
			//Adding the form data to localStorage and array.
			// format the input into a valid JSON structure constructor function
			var obj = new jsonStructure(fullname.value,phone.value,email.value);
			addressBook.push(obj);
			//local storage storing the data to browser's database
			//it can only store string, we have  an array so I converted valid string.
			localStorage['addbook'] = JSON.stringify(addressBook);

			//hide the form panel
			quickAddFormDiv.style.display = "none";

			//it will clear the data after refresh
			//it will update and display the
			clearForm();
			showAddressBook();
		}
	}

	function removeEntry(e){
		// Remove an entry from the addressbook
		if(e.target.classList.contains('delbutton')){
			var remID = e.target.getAttribute('data-id');
			addressBook.splice(remID,1);
			localStorage['addbook'] = JSON.stringify(addressBook);
			showAddressBook();
		}
	}

	function clearForm(){
		var formFields = document.querySelectorAll('.formFields');
		for(var i in formFields){
			formFields[i].value = '';
		}
	}

	//check localstorage has has addbook

	function showAddressBook(){
		if(localStorage['addbook'] === undefined){
			localStorage['addbook'] = '';
		} else {
			addressBook = JSON.parse(localStorage['addbook']);
			// Loop over the array addressBook and insert into the page.
			addBookDiv.innerHTML = '';
			for(var n in addressBook){
				//constructing a string out of JSON objects
				var str = '<div class="entry">';
					str += '<div class="name"><p>' + addressBook[n].fullname + '</p></div>';
					str += '<div class="email"><p>' + addressBook[n].email + '</p></div>';
					str += '<div class="phone"><p>' + addressBook[n].phone + '</p></div>';
					str += '<div class="del"><a href="#" class="delbutton" data-id="' + n + '">Delete</a></div>';
					str += '</div>';
				addBookDiv.innerHTML += str;
			}
		}
	}

	showAddressBook();

}

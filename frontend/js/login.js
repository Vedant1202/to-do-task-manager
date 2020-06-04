if (checkData('user')) {
    deleteData('user');
}

$(function() {
	
	// Switch to Register
	$('.registerBtn').click(function() {
		$('#register, #formContainer').toggleClass('toggle');
	});

});

$('#login-submit').click(function (e) {
    e.preventDefault();
    
    var email = $('#login-email').val().trim(),
        password = $('#login-password').val().trim();

    if (email && password) {
        if (validateEmail(email)) {
            
            $('#login-submit').html(`
                <div class="spinner-border text-light" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            `);

            var data = {
                'email': email,
                'password': password
            };

            loginHandler(data, 
                function (successData) {
                    setData('user', JSON.stringify(successData));
                    Nav.assign('home.html');
                },
                function (error) {
                    alert(`Error: ${error.responseJSON.error}`);
                    $('#login-submit').html("Login");
                    console.log(error);
                }
            )

        } else {
            alert("Error: Please enter a valid email address.");
        }
    } else {
        alert("Error: Please fill in all the fields.");
    }
});

$('#register-submit').click(function (e) {
    e.preventDefault();
    
    var email = $('#register-email').val().trim(),
        password = $('#register-password').val().trim(),
        cpassword = $('#register-cpassword').val().trim(),
        fullName = $('#register-fullname').val().trim();

    if (email && password && cpassword && fullName) {
        if (validateEmail(email)) {
            if (password === cpassword) {
                
                $('#login-submit').html(`
                    <div class="spinner-border text-light" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                `);

                var data = {
                    'email': email,
                    'password': password,
                    'name': fullName,
                };

                signupHandler(data, 
                    function (successData) {
                        alert("Registration successful!");
                        setData('user', JSON.stringify(successData));
                        Nav.assign('home.html');
                    },
                    function (error) {
                        alert(`Error: ${error.responseJSON.error}`);
                        $('#login-submit').html("Login");
                        console.log(error);
                    }
                );

            } else {
                alert("Error: Entered passwords do not match.");
            }
        } else {
            alert("Error: Please enter a valid email address.");
        }
    } else {
        alert("Error: Please fill in all the fields.");
    }
});

function loginHandler(data, successCallback, errorCallback) {
    $.ajax({
        type: "POST",
        url: apiUrl + 'user/auth',
        data: data,
        success: function(data) {
            successCallback(data);
        },
        error: function(error) {
            errorCallback(error);
        },
        dataType: 'json'
    })
}

function logoutHandler() {
    if (checkData('user')) {
        deleteData('user');
    }
    alert("You have been logged out.");
    Nav.assign('login.html');
}
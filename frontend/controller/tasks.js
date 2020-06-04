function getTasks(handler) {
    var tokenString = "Bearer " + getData('user').token;

    $.ajax({
        type: "GET",
        url: apiUrl + 'task/get',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', tokenString);
        },
        success: function(data) {
            if (data) {
                // console.log(data);   
                handler(data);
            }
        },
        error: function(error) {
            console.log(error);
            handler([]);
        },
        dataType: 'json'
    });
}

function createTask(data) {
    var tokenString = "Bearer " + getData('user').token;

    $.ajax({
        type: "POST",
        url: apiUrl + 'task/create',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', tokenString);
        },
        data: data,
        success: function(data) {
            alert("Task created successfully");
            window.location.reload();
        },
        error: function(error) {
            alert("Error! Task was not created.");
            console.log(error);
        },
        dataType: 'json'
    })
}

function updateTask(data) {
    var tokenString = "Bearer " + getData('user').token;

    $.ajax({
        type: "PUT",
        url: apiUrl + 'task/update',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', tokenString);
        },
        data: data,
        success: function(data) {
            alert("Task updated successfully");
            window.location.reload();
        },
        error: function(error) {
            alert("Error! Task was not updated.");
            console.log(error);
        },
        dataType: 'json'
    })
}

function deleteTask(data) {
    var tokenString = "Bearer " + getData('user').token;

    $.ajax({
        type: "DELETE",
        url: apiUrl + 'task/remove',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', tokenString);
        },
        data: data,
        success: function(data) {
            alert("Task deleted successfully");
            window.location.reload();
        },
        error: function(error) {
            alert("Error! Task was not deleted.");
            console.log(error);
        },
        dataType: 'json'
    })
}
function getTasks(handler) {
    $.ajax({
        type: "GET",
        url: apiUrl + 'task/get',
        success: function(data) {
            if (data) {
                // console.log(data);   
                handler(data);
            }
        },
        error: function(error) {
            console.log(error);
        },
        dataType: 'json'
    });
}

function createTask(data) {
    $.ajax({
        type: "POST",
        url: apiUrl + 'task/create',
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
    $.ajax({
        type: "PUT",
        url: apiUrl + 'task/update',
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
    $.ajax({
        type: "DELETE",
        url: apiUrl + 'task/remove',
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
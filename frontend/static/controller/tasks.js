function getTasks(handler) {
    const tokenString = `Bearer ${getData('user').token}`;

    $.ajax({
        type: 'GET',
        url: `${apiUrl}task/get`,
        beforeSend(xhr) {
            xhr.setRequestHeader('Authorization', tokenString);
        },
        success(data) {
            if (data) {
                // console.log(data);
                handler(data);
            }
        },
        error(error) {
            console.log(error);
            handler([]);
        },
        dataType: 'json',
    });
}

function createTask(data) {
    const tokenString = `Bearer ${getData('user').token}`;

    $.ajax({
        type: 'POST',
        url: `${apiUrl}task/create`,
        beforeSend(xhr) {
            xhr.setRequestHeader('Authorization', tokenString);
        },
        data,
        success(data) {
            alert('Task created successfully');
            window.location.reload();
        },
        error(error) {
            alert('Error! Task was not created.');
            console.log(error);
        },
        dataType: 'json',
    });
}

function updateTask(data) {
    const tokenString = `Bearer ${getData('user').token}`;

    $.ajax({
        type: 'PUT',
        url: `${apiUrl}task/update`,
        beforeSend(xhr) {
            xhr.setRequestHeader('Authorization', tokenString);
        },
        data,
        success(data) {
            alert('Task updated successfully');
            window.location.reload();
        },
        error(error) {
            alert('Error! Task was not updated.');
            console.log(error);
        },
        dataType: 'json',
    });
}

function deleteTask(data) {
    const tokenString = `Bearer ${getData('user').token}`;

    $.ajax({
        type: 'DELETE',
        url: `${apiUrl}task/remove`,
        beforeSend(xhr) {
            xhr.setRequestHeader('Authorization', tokenString);
        },
        data,
        success(data) {
            alert('Task deleted successfully');
            window.location.reload();
        },
        error(error) {
            alert('Error! Task was not deleted.');
            console.log(error);
        },
        dataType: 'json',
    });
}

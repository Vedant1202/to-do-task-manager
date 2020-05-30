var tasks = '';

$(document).ready(function() {
    getTasks((data) => { 
        var colorAttr = '';
        var iconAttr = '';
        tasks = data.tasks; 
        var tasksDiv = $('#tasks-div');
        tasksDiv.html('');
    
        tasks.forEach(task => {
            if (task.status === "new") {
                colorAttr = "success";
                iconAttr = "gift"
            } else if (task.status === "in_progress") {
                colorAttr = 'warning';
                iconAttr = "clock"
            } else {
                colorAttr = 'dark';
                iconAttr = "check-circle"
            }
            tasksDiv.append(
                `
                    <div class="card mb-4">
                        <div class="bg-${colorAttr} text-white card-header">
                            <div class="row">
                                <div class="col-8">
                                    ${capitalizeFirstLetter(task.status.replace('_', ' '))} <i class="fas fa-${iconAttr}"></i>
                                </div>
                                <div class="col-4 text-right">
                                    <button data-id="${task._id}" class="btn btn-info btn-sm mr-4" onclick="handleEditTask(event, this);">
                                        Edit
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button data-id="${task._id}" class="btn btn-danger btn-sm" onclick="handleDeleteTask(event, this);">
                                        Remove
                                        <i class="fas fa-trash-alt"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-6">
                                    <h4 class="card-title">
                                        ${capitalizeFirstLetter(task.title)}
                                    </h4>
                                </div>
                                <div class="col-6 text-right">
                                    <h5><span class="badge badge-secondary">Due Date: ${task.dueDate}</span></h5>
                                </div>
                            </div>
                            <p class="card-text">
                                <br>
                                ${task.description ? capitalizeFirstLetter(task.description) : `<i class="text text-muted">No description given</i>`}
                            </p>
                        </div>
                        <div class="card-footer text-muted">
                            <div class="row">
                                <div class="col-3">
                                    Added on ${task.addedOn}
                                </div>
                                <div class="col-9 text-right">
                                    ${
                                        task.tags.map((tag) => `
                                            <span class="badge badge-purple mr-2">${tag}</span>
                                        `).join('')
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                `
            );
            
        });
    });
});


$('#addNewTask').click(function(e) {
    e.preventDefault();
    var data;

    if($('#newTaskDesc').val()) {
        data = {
            'title': $('#newTaskTitle').val().trim(),
            'description': $('#newTaskDesc').val().trim(),
            'dueDate': $('#newTaskDate').val().trim(),
            'status': $('#newTaskStatus').val().trim(),
            'tags': $('#newTaskTags').val(),
            'addedOn': getCurrentDate()
        }
    } else {
        data = {
            'title': $('#newTaskTitle').val().trim(),
            'dueDate': $('#newTaskDate').val().trim(),
            'status': $('#newTaskStatus').val().trim(),
            'tags': $('#newTaskTags').val(),
            'addedOn': getCurrentDate()
        }
    }

    createTask(data);
});


function handleEditTask(event, elem) {
    event.preventDefault();
    var data;

    console.log(elem.dataset.id);

    // if($('#newTaskDesc').val()) {
    //     data = {
    //         'id': elem.dataset.id,
    //         'title': $('#newTaskTitle').val().trim(),
    //         'description': $('#newTaskDesc').val().trim(),
    //         'dueDate': $('#newTaskDate').val().trim(),
    //         'status': $('#newTaskStatus').val().trim(),
    //         'tags': $('#newTaskTags').val(),
    //         'addedOn': getCurrentDate()
    //     }
    // } else {
    //     data = {
    //         'id': elem.dataset.id,
    //         'title': $('#newTaskTitle').val().trim(),
    //         'dueDate': $('#newTaskDate').val().trim(),
    //         'status': $('#newTaskStatus').val().trim(),
    //         'tags': $('#newTaskTags').val(),
    //         'addedOn': getCurrentDate()
    //     }
    // }

    // updateTask(data);
};

function handleDeleteTask(event, elem) {
    event.preventDefault();
    var data = {
        'id': elem.dataset.id,
    };

    deleteTask(data);
};



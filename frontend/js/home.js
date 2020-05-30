var tasks = '';

$(document).ready(function() {


    getTasks((data) => { 
        $('#spinner-container').html('');
        var colorAttr = '';
        var iconAttr = '';
        var tasksDiv = $('#tasks-div');
        
        if (data.tasks && data.tasks.length > 0) {
            tasks = data.tasks; 
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
                                        <button data-id="${task._id}" class="btn btn-info btn-sm mr-4" onclick="openEditTaskModal(event, this);">
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
        } else {
            $('#spinner-container').html(`
                <h3 class="text text-muted">
                    No tasks to show
                </h3>
            `);
        }
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


function openEditTaskModal(event, elem) {
    event.preventDefault();
    var id = elem.dataset.id;
    $('#editTask').modal('show');

    var prevData = tasks.find(function(task) {
        if(task._id === id) {
            return task;
        }
    });

    $('#editTaskTitle').val(prevData.title);
    $('#editTaskDesc').val(prevData.description);
    $('#editTaskDate').val(prevData.dueDate);
    $('#editTaskStatus').val(prevData.status);
    $('#editTaskTags').val(prevData.tags);
    
    $('#updateTask').data().id = id;
    $('#updateTask').data().prevData = prevData;
}


function handleEditTask(event, elem) {
    event.preventDefault();
    var id = $('#updateTask').data().id;
    var prevData = $('#updateTask').data().prevData;
    var newData;

    console.log(prevData);
    
    if (id) {
        
        if($('#editTaskDesc').val()) {
            newData = {
                '_id': id,
                'title': $('#editTaskTitle').val().trim(),
                'description': $('#editTaskDesc').val().trim(),
                'dueDate': $('#editTaskDate').val().trim(),
                'status': $('#editTaskStatus').val(),
                'tags': $('#editTaskTags').val(),
                'addedOn': getCurrentDate()
            }
        } else {
            newData = {
                '_id': id,
                'title': $('#editTaskTitle').val().trim(),
                'dueDate': $('#editTaskDate').val().trim(),
                'status': $('#editTaskStatus').val(),
                'tags': $('#editTaskTags').val(),
                'addedOn': getCurrentDate()
            }
        }
        
        console.log(newData);
        

        if (!(matches(newData, prevData, ['_id', 'title', 'dueDate', 'status', 'addedOn']) && newData.tags.length === prevData.tags.length && newData.tags.sort().every(function(value, index) { return value === prevData.tags.sort()[index]}))) {
            updateTask(newData);
            $('#updateTask').removeData();
        }
    }
};

function handleDeleteTask(event, elem) {
    event.preventDefault();
    var data = {
        '_id': elem.dataset.id,
    };

    deleteTask(data);
};



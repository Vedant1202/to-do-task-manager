let tasks;
let searchTasks;
let completedTasksCount;
let inProgressTasksCount;
let newTasksCount;

if (!checkData('user')) {
    alert('Session expired. Please log in again.');
    Nav.replace('login.html');
}

function appendTasks(arrayOfTasks) {
    let colorAttr = '';
    let iconAttr = '';
    const tasksDiv = $('#tasks-div');

    tasksDiv.html('');

    arrayOfTasks.forEach((task) => {
        if (task.status === 'new') {
            colorAttr = 'success';
            iconAttr = 'gift';
        } else if (task.status === 'in_progress') {
            colorAttr = 'warning';
            iconAttr = 'clock';
        } else {
            colorAttr = 'dark';
            iconAttr = 'check-circle';
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
                                <button data-id="${
                                    task._id
                                }" class="btn btn-info btn-sm mr-4" onclick="openEditTaskModal(event, this);">
                                    Edit
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button data-id="${
                                    task._id
                                }" class="btn btn-danger btn-sm" onclick="handleDeleteTask(event, this);">
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
                            ${
                                task.description
                                    ? capitalizeFirstLetter(task.description)
                                    : `<i class="text text-muted">No description given</i>`
                            }
                        </p>
                    </div>
                    <div class="card-footer text-muted">
                        <div class="row">
                            <div class="col-3">
                                Added on ${task.addedOn}
                            </div>
                            <div class="col-9 text-right">
                                ${task.tags
                                    .map(
                                        (tag) => `
                                        <span class="badge badge-purple mr-2">${capitalizeFirstLetter(tag)}</span>
                                    `
                                    )
                                    .join('')}
                            </div>
                        </div>
                    </div>
                </div>
            `
        );
    });
}

$(document).ready(function () {
    $('#welcome').prepend(`
        ${getData('user').name.split(' ').map(capitalizeFirstLetter).join(' ')}
    `);

    getTasks((data) => {
        $('#spinner-container').html('');
        if (data.tasks && data.tasks.length > 0) {
            tasks = data.tasks;
            completedTasksCount = searchArrayOfObjects(tasks, 'completed', 'status').length;
            inProgressTasksCount = searchArrayOfObjects(tasks, 'in_progress', 'status').length;
            newTasksCount = searchArrayOfObjects(tasks, 'new', 'status').length;

            $('#dashName').html(`${getData('user').name}`);
            $('#dashEmail').html(`${getData('user').email}`);

            $('#completedTasksCount').html(`${completedTasksCount}`);
            $('#inProgressTasksCount').html(`${inProgressTasksCount}`);
            $('#newTasksCount').html(`${newTasksCount}`);

            const pieData = [
                { name: 'Completed', value: completedTasksCount, color: '#6e6e6e' },
                { name: 'In Progress', value: inProgressTasksCount, color: '#ff9900' },
                { name: 'New', value: newTasksCount, color: '#22d10f' },
            ];
            bakeDonut(pieData);

            appendTasks(tasks);
        } else {
            $('#spinner-container').html(`
                <h3 class="text text-muted">
                    No tasks to show
                </h3>
            `);
        }
    });
});

$('#addNewTask').click(function (e) {
    e.preventDefault();
    let data;

    if ($('#newTaskDesc').val()) {
        data = {
            title: $('#newTaskTitle').val().trim(),
            description: $('#newTaskDesc').val().trim(),
            dueDate: $('#newTaskDate').val().trim(),
            status: $('#newTaskStatus').val().trim(),
            tags: $('#newTaskTags').val(),
            addedOn: getCurrentDate(),
        };
    } else {
        data = {
            title: $('#newTaskTitle').val().trim(),
            dueDate: $('#newTaskDate').val().trim(),
            status: $('#newTaskStatus').val().trim(),
            tags: $('#newTaskTags').val(),
            addedOn: getCurrentDate(),
        };
    }

    createTask(data);
});

function openEditTaskModal(event, elem) {
    event.preventDefault();
    const { id } = elem.dataset;
    $('#editTask').modal('show');

    // eslint-disable-next-line array-callback-return
    const prevData = tasks.find(function (task) {
        if (task._id === id) {
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
    const { id } = $('#updateTask').data();
    const { prevData } = $('#updateTask').data();
    let newData;

    console.log(prevData);

    if (id) {
        if ($('#editTaskDesc').val()) {
            newData = {
                _id: id,
                title: $('#editTaskTitle').val().trim(),
                description: $('#editTaskDesc').val().trim(),
                dueDate: $('#editTaskDate').val().trim(),
                status: $('#editTaskStatus').val(),
                tags: $('#editTaskTags').val(),
                addedOn: getCurrentDate(),
            };
        } else {
            newData = {
                _id: id,
                title: $('#editTaskTitle').val().trim(),
                dueDate: $('#editTaskDate').val().trim(),
                status: $('#editTaskStatus').val(),
                tags: $('#editTaskTags').val(),
                addedOn: getCurrentDate(),
            };
        }

        console.log(newData);

        if (
            !(
                matches(newData, prevData, ['_id', 'title', 'dueDate', 'status', 'addedOn']) &&
                newData.tags.length === prevData.tags.length &&
                newData.tags.sort().every(function (value, index) {
                    return value === prevData.tags.sort()[index];
                })
            )
        ) {
            updateTask(newData);
            $('#updateTask').removeData();
        } else {
            alert('No changes detected');
            $('#editTask').modal('hide');
        }
    }
}

function handleDeleteTask(event, elem) {
    event.preventDefault();
    const data = {
        _id: elem.dataset.id,
    };

    deleteTask(data);
}

$('#searchTasks').keyup(function (e) {
    // eslint-disable-next-line eqeqeq
    if (e.keyCode == 13) {
        searchTasks = [];
        const keyArray = ['title', 'description'];
        let resultArray = [];
        const query = $(this).val().trim();

        keyArray.forEach(function (key) {
            resultArray = resultArray.concat(searchArrayOfObjects(tasks, query, key));
        });

        searchTasks = removeDuplicatesFromArray(resultArray);

        if (searchTasks.length > 0) {
            appendTasks(searchTasks);
        } else {
            $('#tasks-div').html(`
                <div class="container" id="spinner-container" style="text-align: center; height: 20em; padding-top: 10%;">
                    <h3 class="text text-muted">
                        No tasks to show
                    </h3>
                </div>
            `);
        }
    }
});

function toggleClass(elem, className) {
    elem.classList.toggle(className);
}

function applyFilters(taskList, statusFilter, tagsFilter, sortFilter = false) {
    let resultArray = [];

    if (statusFilter.length > 0) {
        statusFilter.forEach(function (status) {
            resultArray = resultArray.concat(searchArrayOfObjects(taskList, status, 'status'));
        });
    }
    if (tagsFilter.length > 0) {
        tagsFilter.forEach(function (tag) {
            resultArray = resultArray.concat(searchArrayForTags(taskList, tag));
        });
    }
    if (!tagsFilter.length && !statusFilter.length) {
        resultArray = taskList;
    }

    resultArray = removeDuplicatesFromArray(resultArray);
    if (sortFilter) {
        if (sortFilter === 'dateAsc') {
            resultArray.sort((a, b) => a.dueDate.localeCompare(b.dueDate));
        } else {
            resultArray.sort((a, b) => b.dueDate.localeCompare(a.dueDate));
        }
    }

    console.log(resultArray);
    return resultArray;
}

$('#applyFilters').click(function (e) {
    e.preventDefault();

    const statusFilter = $('#filterStatus').val();
    const tagsFilter = $('#filterTags').val();
    const sortFilter = $('#filterSort').val();

    if (statusFilter.length || tagsFilter.length || sortFilter) {
        if (searchTasks && searchTasks.length > 0) {
            appendTasks(applyFilters(searchTasks, statusFilter, tagsFilter, sortFilter));
        } else {
            appendTasks(applyFilters(tasks, statusFilter, tagsFilter, sortFilter));
        }
    }
});

$('#clearFilters').click(function (e) {
    e.preventDefault();

    $('#filterStatus').val('default');
    $('#filterTags').val('default');
    $('#filterSort').val('default');

    appendTasks(tasks);
});

$('#logout').click(function (e) {
    e.preventDefault();

    logoutHandler();
});

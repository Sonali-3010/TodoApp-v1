// document.writeln('Hello, world!');
window.onload = function() {
  init();
};
let addTask = function(){
    init.addTask();
}
//Initialize stuff
let init = function(){

    addNewDiv("tasksDiv")
    addNewDiv("completedTasksDiv")
    addNewDiv("removeAllTasksDiv")

    let tasksList = []
    let completedTasksList = []

    let addTask = function(){
        let addedTask = getInput()
        if(addedTask){
            tasksList.push(addedTask)
        }
        render()
    }
    init.addTask = addTask;

    let taskDone = function(id){
        let completedTask = tasksList.splice(id,1)
        completedTasksList.push(completedTask[0])
        render()
    }

    let deleteTask = function(id, divClass){
        if(divClass==="tasksDiv")
          tasksList.splice(id,1)
        else {
          completedTasksList.splice(id,1)
        }
        render()
    }

    let removeRemainingTasks = function(){
        tasksList.splice(0, tasksList.length)
        render()
    }

    let markAllTasksAsDone = function(){
        completedTasksList = completedTasksList.concat(tasksList.splice(0,tasksList.length))
        render()
    }

    let removeCompletedTasks = function(){ //
        completedTasksList.splice(0, completedTasksList.length)
        render()
    }

    let removeAllTasks = function(){ //controller and model
        tasksList.splice(0, tasksList.length)
        completedTasksList.splice(0, completedTasksList.length)
        render()
    }

    //Renders both arrays
    let render = function(){ //view
        document.getElementsByClassName('tasksDiv')[0].innerHTML = ""
        if(tasksList.length>0){
            displayDiv("tasksDiv")
        }
        document.getElementsByClassName('completedTasksDiv')[0].innerHTML = ""
        if(completedTasksList.length>0){
            displayDiv('completedTasksDiv')
        }
        document.getElementsByClassName("removeAllTasksDiv")[0].innerHTML = ""
        if(tasksList.length>0 && completedTasksList.length>0){
            document.getElementsByClassName("removeAllTasksDiv")[0].append(getNewButton("Remove All Tasks", removeAllTasks))
        }
    }

    //Displays the task arrays through their divClass
    let displayDiv = function(divClass){ //view
        let dispArray = tasksList;
        if(divClass === 'completedTasksDiv'){
            document.getElementsByClassName(divClass)[0].innerHTML = "<br>---Completed Tasks---<br>";
            dispArray = completedTasksList
        }
        dispArray.forEach((item, i) => {
            displayEachTask(divClass, item, i)
        });
        if(divClass === 'tasksDiv'){
            document.getElementsByClassName(divClass)[0].append(getNewButton("Remove Remaining Tasks", removeRemainingTasks))
            document.getElementsByClassName(divClass)[0].append(getNewButton("Mark All tasks as Done", markAllTasksAsDone))
        }
        else {
            document.getElementsByClassName(divClass)[0].append(getNewButton("Remove Completed Tasks", removeCompletedTasks))
        }
    }

    //To display a task alongwith required buttons
    let displayEachTask = function(divClass, addedTask){ //view
        let id = (arguments[2] === undefined) ? tasksList.length-1 : arguments[2]
        let task = document.createTextNode(addedTask)
        let doneButton = getNewButton("&#10004", function(){ taskDone(id); })
        let deleteButton = getNewButton("&#10008", function(){ deleteTask(id, divClass); });

        appendNodeToDocument(divClass, task)
        if(divClass !== "completedTasksDiv"){ //Not to add a "Task Done" button to an already completed task
            appendNodeToDocument(divClass, doneButton)
        }
        appendNodeToDocument(divClass, deleteButton)
        document.getElementsByClassName(divClass)[0].append(document.createElement("br"))
    }

    //Create Button elements for tasks
    let getNewButton = function(displayText, funcToCall){ //view
        let button = document.createElement("button")
        button.innerHTML = displayText
        button.addEventListener("click", funcToCall)
        return button
    }

    //Get Input
    let getInput = function(){ //controller
        let inp = document.getElementById('taskInput').value
        document.getElementById('taskInput').value = '';
        return inp;
    }

    let appendNodeToDocument = function(divClass, node){ //view
        let x = document.createElement("span")
        x.appendChild(node)
        document.getElementsByClassName(divClass)[0].append(x)
    }

    function addNewDiv(divClass){ //View
        let newDiv = document.createElement("div")
        newDiv.setAttribute("class", divClass)
        document.body.appendChild(newDiv)
    }
}

//유저가 값을 입력
//+버튼을 클릭시 할일이 추가됨
//delete버튼을 누르면 할일이 삭제됨
//check버튼을 누르면 할일이 끝나며 밑줄이 생긴다
//1.check 버튼을 클릭하면 true false
//2.true 이면 끝난 것으로 보고 밑줄을 보이기
//3.false면 안끝난 것으로 보고 밑줄을 없앰

//진행중 끝남 탭을 누르면, 언더바가 이동
//끝난탭을 끝난 아이템만, 진행중 탭은 진행중인 아이템만
//전체탭을 누르면 다시 전체아이템으로 돌아옴

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = [];
let filterList = [];
let underLine = document.getElementById("under-line");
let menubarList = document.querySelectorAll(".task-item");
let mode = "item-all";

addButton.addEventListener("click", addTask);
taskInput.addEventListener("keyup", function(e){
    if(e.key == "Enter")
        addTask(e);
});
menubarList.forEach(menu=>menu.addEventListener("click", (e)=>menuIndicator(e)));
window.onload = function(){
    taskInput.focus();
}

function menuIndicator(e){
    underLine.style.width = e.currentTarget.offsetWidth + "px";
    underLine.style.top = e.currentTarget.offsetTop + e.currentTarget.offsetHeight + "px";
    underLine.style.left = e.currentTarget.offsetLeft + "px";
    console.log(e.currentTarget.offsetTop, " : ", e.currentTarget.offsetHeight);

    mode = e.target.id;
    filtering(mode);
}

function filtering(mode){
    filterList = [];
    if(mode == "item-all"){
        render();
    } else if(mode == "item-ongoing"){
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete == false){
                filterList.push(taskList[i]);
            }
        }
        render();
    }else if(mode == "item-done"){
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete == true){
                filterList.push(taskList[i]);
            }
        }
        render();
    }
    console.log("filtering :",filterList);
}

function addTask(){
    if(taskInput.value == ''){
        return;
    }
    let task = {
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: false,
    };
    taskList.push(task);
    taskInput.value = "";
    console.log("Task : ", taskList);
    render();
    taskInput.focus();
}

//render=====render=====render=====render=====render//
function render(){
    let list = [];
    if(mode == "item-all"){
        list = taskList;
    }else if(mode == "item-ongoing" || mode == "item-done"){
        list = filterList;
    }

    let resultHTML = '';
    console.log("render_mode :", mode);
    console.log("render_list :", list);
    for(let i=0;i<list.length;i++){
        if(list[i].isComplete == true){
            resultHTML += 
        `<div class="task">
            <div class="task-content task-done">${list[i].taskContent}</div>
            <div class="button-wrap">
            <div class="fa-solid fa-arrow-rotate-left toggle-button" onclick="toggleComplete('${list[i].id}')"></div>
            <div class="fa-solid fa-trash-can delete-button" onclick="deleteTask('${list[i].id}')"></div>
            </div>
        </div>`
        } else {
            resultHTML += 
        `<div class="task">
            <div class="task-content">${list[i].taskContent}</div>
            <div class="button-wrap">
                <div class="fa-solid fa-circle-check toggle-button" onclick="toggleComplete('${list[i].id}')"></div>
                <div class="fa-solid fa-trash-can delete-button" onclick="deleteTask('${list[i].id}')"></div>
            </div>
        </div>`
        }
    }
    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id){
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    filtering(mode);
    console.log("toggleComplete: ", taskList);
}
//class="fa-arrow-rotate-left"
function deleteTask(id){
    console.log("deleteTask id: ", id);
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList.splice(i, 1);
            break;
        }
    }
    filtering(mode);
    console.log("deleteTask: ", taskList);
}

function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
}

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
addButton.addEventListener("click", addTask);

function addTask(){
    let task = {
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: false,
    };
    taskList.push(task);
    console.log("Task : ", taskList);
    render();
}

function render(){
    let resultHTML = '';

    for(let i=0;i<taskList.length;i++){
        if(taskList[i].isComplete == true){
            resultHTML += 
        `<div class="task">
            <div class="task-done">${taskList[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${taskList[i].id}')">Check</button>
                <button>Delete</button>
            </div>
        </div>`
        } else {
            resultHTML += 
        `<div class="task">
            <div>${taskList[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${taskList[i].id}')">Check</button>
                <button>Delete</button>
            </div>
        </div>`
        }
    }
    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id){
    console.log("id: ", id);
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = true;
            break;
        }
    }
    render();
    console.log(taskList);
}

function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
}
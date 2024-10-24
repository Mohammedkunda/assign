let todos=[];

function loadtodos(){
    const storedtodo = localStorage.getItem("todos");
    if(storedtodo){
        todos = JSON.parse(storedtodo);
    }
    render();
}

function savelocally(){
    localStorage.setItem("todos",JSON.stringify(todos));
}

function addtodo(){
    const inputel=document.querySelector(".header input");
    if(!inputel.value){
        alert("todos cannot be empty");
        return;
    }
    todos.push({
        title: inputel.value,
        isediting: false,
        iscompleted: false,
    });
    inputel.value='';
    savelocally()
    render();
}
function deletetodo(ind){
    todos.splice(ind,1);
    savelocally();
    render();
}
function edittodo(ind){
    todos[ind].isediting=true;
    render();
}
function savetodo(ind){
    const inputele=document.querySelector(`.todo-${ind} .editinput`);
    if(!inputele.value){
        alert("todo cannot be empty");
        return;
    }
    todos[ind].title=inputele.value;
    todos[ind].isediting=false;
    savelocally();
    render();
}
function togglecomplete(ind){
    todos[ind].iscompleted=!todos[ind].iscompleted;
    savelocally();
    render();
}
function todocomponent(todo,ind){
    const parentel=document.querySelector(".todos");
    const divel=document.createElement("div");
    divel.setAttribute("class",`todo-${ind}`);

    const todotext=document.createElement("h2");
    todotext.innerHTML=todo.title;
    todotext.classList.add("todo-text");

    const checkbox=document.createElement("input");
    checkbox.type="radio";
    checkbox.setAttribute("class","todo-checkbox");
    checkbox.checked=todo.iscompleted;
    checkbox.setAttribute("onclick",`togglecomplete(${ind})`);

    const contentdiv=document.createElement("div");
    contentdiv.setAttribute("class","content");

    const buttoncontainer=document.createElement("div");
    buttoncontainer.setAttribute("class","btnwrapper");

    const deletebutton=document.createElement("button");
    deletebutton.setAttribute("onclick",`deletetodo(${ind})`);
    deletebutton.innerHTML="delete";
    deletebutton.style.backgroundColor="#F03A47";
    deletebutton.style.color = "#ffffff";

    const editbutton=document.createElement("button");
    editbutton.setAttribute("onclick",`edittodo(${ind})`);
    editbutton.innerHTML="Edit";
    editbutton.style.backgroundColor="#f5e74e";
    editbutton.style.color = "#000000";

    contentdiv.appendChild(checkbox);
    contentdiv.appendChild(todotext);

    buttoncontainer.appendChild(editbutton);
    buttoncontainer.appendChild(deletebutton);

    divel.appendChild(contentdiv);
    divel.appendChild(buttoncontainer);
    parentel.appendChild(divel);

    if(todo.isediting){
        const inputel=document.createElement("input");
        inputel.setAttribute("class","editinput");
        inputel.value=todotext.innerHTML;

        const savebutton=document.createElement("button");
        savebutton.innerHTML="save";
        savebutton.setAttribute("onclick",`savetodo(${ind})`);
        savebutton.setAttribute("class","savebtn");
        savebutton.style.backgroundColor="#369f57";
        savebutton.style.color = "#ffffff";
        checkbox.disabled="true";
        contentdiv.replaceChild(inputel,todotext);
        buttoncontainer.replaceChild(savebutton,editbutton);
    }
    if(checkbox.checked){
        todotext.style.textDecoration="line-through";
        todotext.style.color="rgb(0,255,0)";
        editbutton.disabled="true";
        editbutton.style.opacity="0.7";
    }
}
function render(){
    document.querySelector(".todos").innerHTML="";
    for(let i=0;i<todos.length;i++){
        todocomponent(todos[i],i);
    }
}
loadtodos();
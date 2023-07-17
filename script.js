let list =0;
let containerBox = document.querySelector('.js-list-container');
const inputElement = document.querySelector('.js-text-input');
const addBtnElement = document.querySelector('.js-add-btn');
const deleteBtnElement = document.querySelectorAll('.js-delete-button');
const allDltBtnElement = document.querySelector('.js-all-dlt-btn');
const msgBoxElement = document.querySelector('.js-msg-box');
const showAllBtnElement = document.querySelector('.js-show-all');

showStoredData();

showAllBtnElement.addEventListener('click',()=>{
    showStoredData();
});

addBtnElement.addEventListener('click',()=>{
    append(containerBox,inputElement.value);
    inputElement.value = '';
});

inputElement.addEventListener('keydown',(event)=>{
    if(event.key === 'Enter') {
        append(containerBox,inputElement.value);
        inputElement.value = '';
    }
});


allDltBtnElement.addEventListener('click', ()=>{
    containerBox.innerHTML = '';
    list = 0;
    
    if(localStorage.length !== 0) {
        localStorage.clear();
        displayMessage('all tasks deleted!', 2000);

    }
    else if(containerBox.innerHTML === '') {
        displayMessage('You have nothing to delete!',2000);
    }
    
});


function hideTodo(id) {
    let divElement = document.getElementById(id+'-todo');
    // divElement.parentElement.removeChild(divElement);
    divElement.remove();
}

function append(place,value) {
    if(value.length > 1) {

        saveTodo(`listNum${list}`,list);
        saveTodo(`todo${list}`,value);
        let html = `
                <div class="todo-item js-todo-item" id="${list}-todo">

                    <p style="display: inline; margin-right: 5px;
                    color:white">=></p>

                    <p style="display: inline; 
                    margin-right: 5px;
                    color: white;">${value}</p>
                    
                    <button class="delete-button js-delete-button" id="${list}" onclick="hideTodo(${list})">Hide</button>
                </div>`
        
        list++;
        place.innerHTML += html;
        displayMessage('Added!', 2000);
        
    }
    else if(value === '') {
        msgBoxElement.innerHTML = 'input field is empty!';
        displayMessage('input field is empty!',2000);
    }
}

function displayMessage(message , duration ) {
    msgBoxElement.textContent = message;

    setTimeout(()=>{
        msgBoxElement.textContent = '';
    }, duration);
}

function saveTodo(key,value) {
    localStorage.setItem(key , value);
}
function getTodo(key) {
    return localStorage.getItem(key);
}



function showStoredData() {

    containerBox.innerHTML = '';
    const length = (localStorage.length)/2;
    
    if(length !== 0) {

    
        for(let i=0; i<length; i++) {
            const listNum= getTodo(`listNum${i}`);
            const todo = getTodo(`todo${i}`);
            let html = `
                    <div class="todo-item js-todo-item" id="${listNum}-todo">

                        <p style="display: inline; margin-right: 5px;
                        color:white">=></p>

                        <p style="display: inline; 
                        margin-right: 5px;
                        color: white;">${todo}</p>
                        
                        <button class="delete-button js-delete-button" id="${listNum}" onclick="hideTodo(${listNum})">Hide</button>
                    </div>`

            
            containerBox.innerHTML += html;
        }
    }
    

}





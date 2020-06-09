// DOMS
const layoutMainTodo = document.getElementById('layout-main-todo');
const mainTodoNot = layoutMainTodo.querySelector('.main-todo-not');
const todoNotInput = mainTodoNot.querySelector('input');

const mainTodoIs = layoutMainTodo.querySelector('.main-todo-is');
const mainIsCk = mainTodoIs.querySelector('input');
const mainIsText = mainTodoIs.querySelector('span');
const mainIsDelBtn = mainTodoIs.querySelector('i');
const mainTodoCherrUp = layoutMainTodo.querySelector('.main-todo-cherrUp');

// state
let mainTodo = {};
const MAINTODO_LS = 'mainTodo';
const cherrUp = ['Good Job!', 'Greate Work!', 'Nice', 'Way to go!'];

// function
const inputPaint = () => {
  todoNotInput.value = '';
  mainIsCk.checked = false;
  mainIsText.classList.remove('main-todo-checked');
  mainTodoNot.classList.remove('main-todo-showing');
  mainTodoIs.classList.add('main-todo-showing');
  todoNotInput.addEventListener('keypress', todoInput);
};

const saveTodo = (content) => {
  mainTodo = { content };
  localStorage.setItem(MAINTODO_LS, JSON.stringify(mainTodo));
  chackTodo();
};

const todoPaint = () => {
  mainTodoNot.classList.add('main-todo-showing');
  mainTodoIs.classList.remove('main-todo-showing');
  mainIsText.textContent = mainTodo.content;
  mainIsCk.addEventListener('change', changeCompleted);
  mainIsDelBtn.addEventListener('click', mainTodoDel);
};

// Event
const mainTodoDel = () => {
  saveTodo('');
};
const changeCompleted = () => {
  mainIsText.classList.toggle('main-todo-checked');
  if (mainIsText.matches('.main-todo-checked')) {
    const num = Math.floor(Math.random() * 3);
    mainTodoCherrUp.textContent = cherrUp[num];
    setTimeout(() => {
      mainTodoCherrUp.textContent = '';
    }, 1000);
  }
};

const todoInput = (e) => {
  if (e.keyCode !== 13) return;
  saveTodo(e.target.value);
};

const chackTodo = () => {
  mainTodo = JSON.parse(localStorage.getItem(MAINTODO_LS));
  if (mainTodo === null || mainTodo.content === '') {
    // main todo not
    inputPaint();
  } else {
    // main todo is
    todoPaint();
  }
};

export function init() {
  chackTodo();
}

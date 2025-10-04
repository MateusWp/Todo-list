// Seleção de elementos

const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');
const editForm = document.querySelector('#edit-form');
const editInput = document.querySelector('#edit-input');
const cancelEditBtn = document.querySelector('#cancel-edit-btn');
const searchInput = document.querySelector('#search-input');

let oldInputValue; // Variável para armazenar o valor antigo do input


// Funções

const saveTodo = (text) => {
    const todo = document.createElement('div'); // Cria um novo elemento div
    todo.classList.add('todo'); // Adiciona a classe 'todo' ao elemento

    const todoTitle = document.createElement('h3'); // Cria um elemento h3 para o título da tarefa
    todoTitle.innerText = text; // Define o texto do título como o valor passado
    todo.appendChild(todoTitle); // Adiciona o título ao elemento todo

    const doneBtn = document.createElement('button'); // Cria o botão de concluir
    doneBtn.classList.add('finish-todo'); // Adiciona a classe ao botão
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'; // Adiciona o ícone ao botão
    todo.appendChild(doneBtn); // Adiciona o botão ao elemento todo

    const editBtn = document.createElement('button');
    editBtn.classList.add('edit-todo'); 
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'; 
    todo.appendChild(editBtn); 

    const deleteBtn = document.createElement('button'); 
    deleteBtn.classList.add('remove-todo'); // 
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'; 
    todo.appendChild(deleteBtn); 

    todoList.appendChild(todo); // Adiciona o elemento todo à lista de tarefas
    todoInput.value = ''; // Limpa o input após adicionar a tarefa
    todoInput.focus(); // Coloca o foco de volta no input

    todoList.classList.remove('hide'); // Garante que a lista de tarefas esteja visível
};

const toggleForms = () => {
    editForm.classList.toggle('hide'); // Alterna a visibilidade do formulário de edição
    todoForm.classList.toggle('hide'); // Alterna a visibilidade do formulário de adicionar
    todoList.classList.toggle('hide'); // Alterna a visibilidade da lista de tarefas
};

const updateTodo = (text) => {
    const todos = document.querySelectorAll('.todo'); // Seleciona todas as tarefas
    todos.forEach((todo) => {
        let todoTitle = todo.querySelector('h3'); // Seleciona o título da tarefa
        if(todoTitle.innerText === oldInputValue){ // Verifica se o título corresponde ao valor antigo
            todoTitle.innerText = text; // Atualiza o título com o novo texto
        }
    });
}


// Eventos

todoForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário
    const inputValue = todoInput.value; // Obtém o valor do input
    if(inputValue){ // Verifica se o input não está vazio
        saveTodo(inputValue); // Chama a função para salvar a tarefa
    }
});

document.addEventListener('click', (e) => {
    const targetEl = e.target; // Elemento que foi clicado
    const parentEl = targetEl.closest('div'); // Elemento pai mais próximo (a tarefa)
    let todoTitle;

    if(parentEl && parentEl.querySelector('h3')){ // Verifica se o elemento pai existe e contém um h3
        todoTitle = parentEl.querySelector('h3').innerText; // Obtém o título da tarefa
    }


    if(targetEl.classList.contains('finish-todo')){ // Verifica se o botão de concluir foi clicado
        parentEl.classList.toggle('done'); // Adiciona a classe 'done' à tarefa
    }

    if(targetEl.classList.contains('remove-todo')){ // Verifica se o botão de remover foi clicado
        parentEl.remove(); // Remove a tarefa
        // setAttribute("id", 'remove-todo'), colocar ID ao invés de CLASS
    }

    if(targetEl.classList.contains('edit-todo')){ // Verifica se o botão de editar foi clicado
        toggleForms(); // Alterna entre os formulários

        editInput.value = todoTitle; // Define o valor do input de edição como o título da tarefa
        oldInputValue = todoTitle; // Armazena o valor antigo do título
    }
});

cancelEditBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Previne o comportamento padrão do botão
    toggleForms(); // Alterna entre os formulários
});

editForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário
    const editInputValue = editInput.value; // Obtém o valor do input de edição
    if(editInputValue){ // Verifica se o input de edição não está vazio
        updateTodo(editInputValue); // Chama a função para atualizar a tarefa
    }

    toggleForms(); // Alterna entre os formulários

});

// barra de pesquisa deletando a lista//

// filtro não funciona //

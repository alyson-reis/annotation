// Estas variavéis pegam o botão, o título e a nota pelo ID.
const saveBtn = document.getElementById('save-btn');
const titleInput = document.getElementById('title-input');
const noteInput = document.getElementById('note-input');

//A variavél nota se estiver vazia, ela cria um arrayz vazio e guarda as anotações dentro do arrzay
let notes = JSON.parse(localStorage.getItem('notes')) || [];

//A função recebe dois parâmentros, "note" e "index".
function createNoteElement(note, index) {
//A variavél noteEl cria uma div
const noteEl = document.createElement('div');
// A div terá a classe com o nome "note", e x'
noteEl.className = 'note';
// A nota nova vai aparecer um pouco mais para baixo e para a direita da anterior
noteEl.style.top = `${100 + index * 30}px`;
noteEl.style.left = `${100 + index * 30}px`;
// A variavél irá criar esses elementos em HTML
noteEl.innerHTML = `
    <div class="note-header">
    <span class="note-title">${note.title}</span>
    <div class="note-buttons">
        <button class="minimize-btn">-</button>
        <button class="delete-btn">x</button>
    </div>
    </div>
    <div class="note-content">${note.content}</div>
`;

// Quando clicar na lixeira
noteEl.querySelector('.delete-btn').onclick = () => {
// Remove a anotação da página
    notes.splice(index, 1);
// Remove a anotação do LocalStorage
    localStorage.setItem('notes', JSON.stringify(notes));
// Remove a janelinha da anotação
    noteEl.remove();
};
// Quando cliar em minimizar
noteEl.querySelector('.minimize-btn').onclick = () => {
// O conteúdo desaparece ("display:none" é ativo)
    noteEl.classList.toggle('minimized');
};
//Ao soltar o mouse, ele tornar-se falso
let isDragging = false;
// A posição horizontal e vertical onde você clicou na nota.
let offsetX, offsetY;

// Quando pressionar a nota
noteEl.addEventListener('mousedown', (e) => {
// Torna a variavél verdadeira 
    isDragging = true;
// Calcula a posição exata da nota
    offsetX = e.clientX - noteEl.offsetLeft;
    offsetY = e.clientY - noteEl.offsetTop;
});

// Quando mover a nota
document.addEventListener('mousemove', (e) => {
// Mover a nota se ela for "True"
    if (isDragging) {
// Calcula onde a nota estava e move conforme o mouse
    noteEl.style.left = `${e.clientX - offsetX}px`;
    noteEl.style.top = `${e.clientY - offsetY}px`;
    }
});

// Quando soltar a nota
document.addEventListener('mouseup', () => {
// Torna-se false deixando a nota onde o mouse parou de pressiona-la
    isDragging = false;
});

// Adciona dentro do body a nota
document.body.appendChild(noteEl);
}
// Carrega e mostra todas as anotações existentes
    function loadNotes() {
// Passa por cada anotação da lista
notes.forEach((note, index) => {
// Cria o bloco da anotação na tela
    createNoteElement(note, index);
});
}

// Quando eu clicar em "Salvar"
saveBtn.onclick = () => {
// A variavél pega os valores do título e das anotações (OBS: Trim serve para remover os espaços)
const title = titleInput.value.trim();
const content = noteInput.value.trim();
// Se o Título e a nota estiverem vazias, retorna a mesnsagem "Preencha o título e a anotação." (OBS.: "!" signifca "vazio")
if (!title || !content) {
    alert("Preencha o título e a anotação.");
    return;
}
// Cria um objeto com o título e a anotação
const newNote = { title, content };
// Adiciona esse objeto ao array de notas
notes.push(newNote);
// Salva o array atualizado no localStorage
localStorage.setItem('notes', JSON.stringify(notes));
// Cria o bloquinho visual na tela
createNoteElement(newNote, notes.length - 1);

// Limpa os campos
titleInput.value = '';
noteInput.value = '';
};

// Ao atualiza a página, deixe como estava antes de atualiza-la
window.onload = loadNotes;

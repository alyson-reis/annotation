function save (){
    const text = document.getElementById('text').value
    let annotation = JSON.parse(localStorage.getItem('notes')) || []
    annotation.push(text)
    localStorage.setItem('notes', JSON.stringify(annotation))

    display()
    document.getElementById('text').value
}
function display (){
    const history = document.getElementById("history")
    history.innerHTML = ''
    const annotation =JSON.parse(localStorage.getItem('notes')) || []
    annotation.forEach((annotation, index) => {
        const item = document.createElement('p')
        item.innerText = `${index + 1}. ${annotation}`
        history.appendChild(item)
    }
)
}
function clearNote() {
  localStorage.removeItem('notes');
  document.getElementById('text').value = ''
  document.getElementById('history').innerHTML = ''
  alert("Todas as anotações foram apagadas.")
}
window.onload = display

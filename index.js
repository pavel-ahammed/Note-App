const btnEl = document.getElementById("btn");
const appEl = document.querySelector("#app");
getNotes().forEach((notes) => {
  const noteEl = createNoteElement(notes.id, notes.content);
  appEl.insertBefore(noteEl, btnEl);
});
function createNoteElement(id, content) {
  const divElement = document.createElement("div");
  appEl.appendChild(divElement);
  divElement.classList.add("text-area-wrapper");
  divElement.innerHTML = ` <i class="fa-solid fa-trash"></i>`;
  const trashBtn = divElement.querySelector(".fa-trash");
  const textElement = document.createElement("textarea");
  textElement.classList.add("note");
  textElement.placeholder = "Empty Note";
  textElement.value = content;
  divElement.appendChild(textElement);
  trashBtn.addEventListener("click", () => {
    divElement.remove();
    deletNote(id);
  });
  function deletNote(id) {
    const notes = getNotes();
    const updateNote = notes.filter((note) => note.id !== id);
    saveNote(updateNote);
  }
  textElement.addEventListener("input", () => {
    updateNote(id, textElement.value);
  });
  return divElement;
}

function addNote() {
  const notes = getNotes();
  const noteObj = {
    id: Math.floor(Math.random() * 100000),
    content: "",
  };
  const noteEl = createNoteElement(noteObj.id, noteObj.content);
  appEl.insertBefore(noteEl, btnEl);
  notes.push(noteObj);
  saveNote(notes);
}
function saveNote(notes) {
  localStorage.setItem("note-app", JSON.stringify(notes));
}
function getNotes() {
  return JSON.parse(localStorage.getItem("note-app") || "[]");
}
btnEl.addEventListener("click", addNote);

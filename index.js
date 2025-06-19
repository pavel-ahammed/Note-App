const btnEl = document.getElementById("btn");
const appEl = document.getElementById("app");

// পেজ লোডের সময় নোটগুলো দেখানো
getNotes().forEach((note) => {
  const noteEl = createNoteElement(note.id, note.content);
  appEl.insertBefore(noteEl, btnEl);
});

function createNoteElement(id, content) {
  const divElement = document.createElement("div");
  divElement.classList.add("text-area-wrapper");
  divElement.innerHTML = `<i class="fa-solid fa-trash"></i>`;

  const trashBtn = divElement.querySelector(".fa-trash");
  const textElement = document.createElement("textarea");
  textElement.classList.add("note");
  textElement.placeholder = "Empty Note";
  textElement.value = content;

  divElement.appendChild(textElement);

  trashBtn.addEventListener("click", () => {
    divElement.remove();
    deleteNote(id);
  });

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

function deleteNote(id) {
  const notes = getNotes();
  const updatedNotes = notes.filter((note) => note.id !== id);
  saveNote(updatedNotes);
}

function updateNote(id, content) {
  const notes = getNotes();
  const target = notes.find((note) => note.id === id);
  if (target) {
    target.content = content;
    saveNote(notes);
  }
}

function saveNote(notes) {
  localStorage.setItem("note-app", JSON.stringify(notes));
}

function getNotes() {
  const notesJSON = localStorage.getItem("note-app");
  if (!notesJSON) return [];
  try {
    return JSON.parse(notesJSON);
  } catch (e) {
    console.error("LocalStorage data corrupted", e);
    return [];
  }
}

btnEl.addEventListener("click", addNote);

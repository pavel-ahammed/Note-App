const formEl = document.querySelector(".form");
const inputEl = document.querySelector(".input");
const ulEl = document.querySelector(".list");
const items = JSON.parse(localStorage.getItem("list")) || [];
items.forEach((task) => {
  toDoList(task);
});
formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  // console.log(inputEl.value);

  toDoList();
});
function toDoList(task) {
  let newTask = inputEl.value;
  if (task) {
    newTask = task.name;
  }
  if (!newTask.trim()) return;
  const liEl = document.createElement("li");
  if (task && task.checked) {
    liEl.classList.add("checked");
  }
  liEl.innerText = newTask;
  ulEl.appendChild(liEl);
  inputEl.value = "";
  const checkBtn = document.createElement("div");
  checkBtn.innerHTML = `<i class="fas fa-check-square">`;
  liEl.appendChild(checkBtn);
  const trashBtn = document.createElement("div");
  trashBtn.innerHTML = `<i class="fas fa-trash"></i>`;
  liEl.appendChild(trashBtn);
  checkBtn.addEventListener("click", () => {
    liEl.classList.toggle("checked");
    updateLocalStorage();
  });
  trashBtn.addEventListener("click", () => {
    liEl.remove();
    updateLocalStorage();
  });
  updateLocalStorage();
}

function updateLocalStorage() {
  const liElements = document.querySelectorAll("li");
  let items = [];
  liElements.forEach((liEl) => {
    items.push({
      name: liEl.innerText,
      checked: liEl.classList.contains("checked"),
    });
  });
  localStorage.setItem("list", JSON.stringify(items));
}

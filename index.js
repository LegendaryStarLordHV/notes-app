const form = document.querySelector("#task-form");
const input = document.querySelector("#new-task-input");
const list_el = document.querySelector("#tasks");

function onInputChange() {
  this.style.height = 0;
  this.style.height = this.scrollHeight + "px";
}

function onWindowSizeChange(el) {
  el.style.height = 0;
  el.style.height = el.scrollHeight + "px";
}

window.addEventListener("resize", () => {
  const text_areas = document.getElementsByTagName("textarea");
  for (let i = 0; i < text_areas.length; i++) {
    onWindowSizeChange(text_areas[i]);
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const task = input.value;

  const task_el = document.createElement("div");
  task_el.classList.add("task");

  const content_el = document.createElement("div");
  content_el.classList.add("content");

  task_el.appendChild(content_el);

  const task_input = document.createElement("textarea");
  task_input.type = "text";
  task_input.value = task;
  task_input.classList.add("task-text");
  task_input.setAttribute("readonly", "readonly");
  task_input.setAttribute("maxlength", "80");

  content_el.appendChild(task_input);

  const task_actions_el = document.createElement("div");
  task_actions_el.classList.add("actions");

  const task_edit_btn = document.createElement("button");
  task_edit_btn.classList.add("edit");
  task_edit_btn.textContent = "Edit";

  const task_delete_btn = document.createElement("button");
  task_delete_btn.classList.add("delete");
  task_delete_btn.textContent = "Delete";

  task_actions_el.appendChild(task_edit_btn);
  task_actions_el.appendChild(task_delete_btn);

  task_el.appendChild(task_actions_el);

  list_el.appendChild(task_el);

  input.value = "";

  task_edit_btn.addEventListener("click", (e) => {
    if (task_edit_btn.textContent.toLocaleLowerCase() === "edit") {
      task_edit_btn.textContent = "Save";
      task_input.removeAttribute("readonly");
      task_input.classList.add("edit-mode");
      task_input.focus();
    } else {
      task_edit_btn.textContent = "Edit";
      task_input.setAttribute("readonly", "readonly");
      task_input.classList.remove("edit-mode");
    }
  });

  task_delete_btn.addEventListener("click", (e) => {
    list_el.removeChild(task_el);
  });

  const text_area = document.getElementsByTagName("textarea");
  for (let i = 0; i < text_area.length; i++) {
    text_area[i].setAttribute(
      "style",
      "height:" + text_area[i].scrollHeight + "px"
    );
    text_area[i].addEventListener("input", onInputChange, false);
    text_area[i].addEventListener("keypress", (e) => {
      e.key === "Enter" ? e.preventDefault() : null;
    });
  }
});

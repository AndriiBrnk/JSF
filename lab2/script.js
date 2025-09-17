$(function () {
  let total = 0;
  let unchecked = 0;

  function updateCounters() {
    $("#item-count").text(total);
    $("#unchecked-count").text(unchecked);
  }

  $("#new-todo").on("click", (e) => {
    e.preventDefault();
    const task = $("#task").val().trim();
    if (!task) return;

    total++;
    unchecked++;
    updateCounters();

    const $li = $("<li>").addClass("todo-container");
    const $checkbox = $("<input>")
      .attr("type", "checkbox")
      .addClass("todo-checkbox");
    const $text = $("<span>").addClass("todo-text").text(task);
    const $deleteBtn = $("<button>").addClass("todo-delete").text("Видалити");

    $li.append($checkbox, $text, $deleteBtn);
    $("#todo-list").append($li);

    $("#task").val("");
  });

  $("#todo-list").on("change", ".todo-checkbox", () => {
    const $li = $(this).closest(".todo-container");
    const $text = $li.find(".todo-text");

    if (this.checked) {
      $text.css("text-decoration", "line-through").css("color", "gray");
      unchecked--;
    } else {
      $text.css("text-decoration", "none").css("color", "inherit");
      unchecked++;
    }
    updateCounters();
  });

  $("#todo-list").on("click", ".todo-delete", () => {
    const $li = $(this).closest(".todo-container");
    const $checkbox = $li.find(".todo-checkbox");

    if (!$checkbox.prop("checked")) {
      unchecked--;
    }
    total--;
    $li.remove();
    updateCounters();
  });

  updateCounters();
});

const addBookBtn = document.querySelector(".add-book");
const titleVal = document.querySelector("#title").value;
const authorVal = document.querySelector("#author").value;
const isbnVal = document.querySelector("#isbn").value;
const tableBody = document.querySelector(".table-body");
const alert = document.querySelector(".alert");

// addBook
addBookBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const titleInput = document.querySelector("#title");
  const authorInput = document.querySelector("#author");
  const isbnInput = document.querySelector("#isbn");
  if (!titleInput.value || !authorInput.value || !isbnInput.value) {
    console.log("try again");
    return;
  }

  const newRow = `
  <tr>
    <td>${titleInput.value}</td>
    <td>${authorInput.value}</td>
    <td>${isbnInput.value}</td>
    <td><i class="far fa-window-close"></i></td>
  </tr>
  `;

  tableBody.insertAdjacentHTML("beforeend", newRow);
  addAlert("added", "Book added!");
  titleInput.value = "";
  authorInput.value = "";
  isbnInput.value = "";
});

// removeBook
tableBody.addEventListener("click", (e) => {
  if (!e.target.classList.contains("fa-window-close")) return;
  e.target.closest("tr").remove();
  addAlert("removed", "Book removed!");
});

function addAlert(msg, markup) {
  const alertEl = document.createElement("p");
  alertEl.classList.add(`alert-${msg}`);
  alertEl.innerText = markup;
  alert.appendChild(alertEl);
  setTimeout(() => {
    alertEl.remove();
  }, 3000);
}

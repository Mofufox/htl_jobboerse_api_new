const pageSize = 10; // Anzahl der Unternehmen pro Seite
let pageIndex = 0; // Aktueller Seitenindex

function updateTable(pageIndex) {
  const url =
    "https://corsproxy.io/?" +
    encodeURIComponent(
      `https://jobboerse.htl-braunau.at/htl_job_api.php?cmd=getcpylist&count=${pageSize}&from=${pageIndex * pageSize}&maxage=300`
    );

  fetch(url)
    .then((data) => {
      return data.json();
    })
    .then((objectData) => {
      let tableData = "";
      objectData.resultset.map((values) => {
        tableData += `
        <tr class="tr-table-body">
        <td>${values.name}</td>
        <td>${values.zip} ${values.city} - ${values.country}</td>
        <td>Jobs: ${values.jobs}</td>
        <td><button class="more-info-btn">More info</button></td>
      </tr>`;
      });
      const tableBody = document.getElementById("table-body");
      tableBody.innerHTML = tableData;
    })
    .catch((error) => console.log(error));
}

function handlePageClick(pageIndex) {
  updateTable(pageIndex);
}

function previousPage() {
  if (pageIndex > 0) {
    pageIndex--;
    updateTable(pageIndex);
  }
}

function nextPage() {
  pageIndex++;
  updateTable(pageIndex);
}

document.addEventListener("DOMContentLoaded", function () {
  // Erste Tabelle anzeigen
  updateTable(pageIndex);

  // Event-Listener für Seitennummern hinzufügen
  const pageLinks = document.querySelectorAll(".page-link");
  pageLinks.forEach((link, index) => {
    link.addEventListener("click", function () {
      handlePageClick(index);
    });
  });

  // Event-Listener für "Zurück"-Button hinzufügen
  const previousButton = document.getElementById("previous-button");
  previousButton.addEventListener("click", previousPage);

  // Event-Listener für "Weiter"-Button hinzufügen
  const nextButton = document.getElementById("next-button");
  nextButton.addEventListener("click", nextPage);
});




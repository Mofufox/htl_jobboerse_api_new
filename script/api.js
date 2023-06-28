const quantityOfCompaniesPerSite = 10; 
let pageIndex = 0; 

function updateTable(pageIndex) {
  const url =
    "https://corsproxy.io/?" +
    encodeURIComponent(
      `https://jobboerse.htl-braunau.at/htl_job_api.php?cmd=getcpylist&count=${quantityOfCompaniesPerSite}&from=${pageIndex * quantityOfCompaniesPerSite}&maxage=300`
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
        <ul class="ul-opened-by-button"></ul>
      </tr>`;
      });
      const tableBody = document.getElementById("table-body");
      tableBody.innerHTML = tableData;
    })
    .catch((error) => console.log(error));
}

// function handlePageClick(pageIndex) {
//   updateTable(pageIndex);
// }

// function previousPage() {
//   if (pageIndex > 0) {
//     pageIndex--;
//     updateTable(pageIndex);
//   }
// }

// function nextPage() {
//   pageIndex++;
//   updateTable(pageIndex);
// }

document.addEventListener("DOMContentLoaded", function () {
  updateTable(pageIndex);

  const pageLinks = document.querySelectorAll(".page-link");
  pageLinks.forEach((link, index) => {
    link.addEventListener("click", function () {
      handlePageClick(index);
    });
  });

  const previousButton = document.getElementById("previous-button");
  previousButton.addEventListener("click", previousPage);

  const nextButton = document.getElementById("next-button");
  nextButton.addEventListener("click", nextPage);
});




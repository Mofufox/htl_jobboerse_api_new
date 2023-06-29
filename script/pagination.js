const quantityOfCompaniesPerSite = 10;
let quantityOfCompanies = 0;
let pageIndex = 1;

function updateTable(pageIndex) {
  // const url =
  // "https://corsproxy.io/?" +
  // encodeURIComponent(
  //   `https://jobboerse.htl-braunau.at/htl_job_api.php?cmd=getcpylist&count=${quantityOfCompaniesPerSite}&from=1&maxage=300`
  // );

  // Erste Seite muss mit 1 anfangen
  // Zweite Seite muss mit 11 anfangen

  const url =
    "https://corsproxy.io/?" +
    encodeURIComponent(
      `https://jobboerse.htl-braunau.at/htl_job_api.php?cmd=getcpylist&count=${quantityOfCompaniesPerSite}&from=${pageIndex}&maxage=300`
    );

  const urlQuantityOfCompanies =
    "https://corsproxy.io/?" +
    encodeURIComponent(
      `https://jobboerse.htl-braunau.at/htl_job_api.php?cmd=getcpysize&maxage=300`
    );

  //fetch quantityOfCompanies
  fetch(urlQuantityOfCompanies)
    .then((data) => {
      return data.json();
    })
    .then((objectData) => {
      quantityOfCompanies = objectData.size;
      // console.log("Quantity of companies: " + quantityOfCompanies);
    })
    .catch((error) => console.log(error));

  fetch(url)
    .then((data) => {
      return data.json();
    })
    .then((objectData) => {
      // console.log(objectData);
      // console.log(objectData.resultset);
      let tableData = "";
      objectData.resultset.map((values) => {
        // console.log(values);
        console.log(values.nr + "." + values.name);
        console.log("Page index: " + pageIndex);
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

updateTable(pageIndex);

// pagination

let linkElements = document.getElementsByClassName("link");
const prevBtnElement = document.querySelector(".prev-btn");
const nextBtnElement = document.querySelector(".next-btn");

prevBtnElement.addEventListener("click", () => {
  if (pageIndex > 1) {
    pageIndex -= 10;
    updateTable(pageIndex);
  } else {
    alert("Sie befinden sich auf der ersten Seite!");
  }
});

nextBtnElement.addEventListener("click", () => {
  if (pageIndex < quantityOfCompanies) {
    pageIndex += 10;
    console.log("Page index: " + pageIndex);
    updateTable(pageIndex);
  } else {
    alert("Sie befinden sich auf der letzten Seite!");
  }
});

const middleButtonElement = document.querySelector(".middle-button");

middleButtonElement.addEventListener("click", () => {
  const paginationInputElementValue = parseInt(document.getElementById("pagination-input").value);

  // 1, 11, 21, 31, 41, 51, 61, 71
  pageIndex = paginationInputElementValue;

  if (paginationInputElementValue > 1) {
    pageIndex = (paginationInputElementValue * 10) + 1 - 10;
  }

  if (paginationInputElementValue === 0) {
    alert("Die erste Seite hat die Nummer 1!");
    return;
  }

  if (paginationInputElementValue > 9) {
    alert("Es gibt nur 9 Seiten!");
    return;
  }
  updateTable(pageIndex);
});
